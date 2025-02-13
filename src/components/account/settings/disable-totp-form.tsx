import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ConfirmDialog } from '../../shared/confirm-dialog'
import { Button } from '../../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../../ui/form'
import { Input } from '../../ui/input'

import { mfaAPI } from '@/src/api/mfa'

const disableTotpSchema = z.object({
	password: z
		.string()
		.min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
})

export type DisableTotp = z.infer<typeof disableTotpSchema>

export function DisableTotpForm() {
	const [isOpen, setIsOpen] = useState(false)

	const { invalidateQueries } = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['totp disable'],
		mutationFn: (data: DisableTotp) => mfaAPI.totpDisable(data),
		onSuccess() {
			invalidateQueries({ queryKey: ['mfa status'] })
			setIsOpen(false)
			toast.success('Метод успешно отключён')
		},
		onError(error) {
			if (error.message) {
				toast.error(error.message)
			} else {
				toast.error('Ошибка при отключении')
			}
		}
	})

	const form = useForm<DisableTotp>({
		resolver: zodResolver(disableTotpSchema),
		defaultValues: {
			password: ''
		}
	})

	useEffect(() => {
		form.reset()
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: DisableTotp) {
		await mutateAsync(data)
	}

	return (
		<ConfirmDialog
			title='Отключение двухфакторной аутентификации'
			description={
				<div className='space-y-4'>
					<p className='mb-2'>
						Вы уверены, что хотите отключить этот метод
						двухфакторной аутентификации?{' '}
					</p>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='mt-2'
						>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem className='text-foreground'>
										<FormLabel>Пароль</FormLabel>
										<FormControl>
											<Input
												type='password'
												placeholder='******'
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</div>
			}
			confirmText='Отключить'
			destructive
			handleConfirm={form.handleSubmit(onSubmit)}
			isLoading={isPending}
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Button variant='destructive'>Отключить</Button>
		</ConfirmDialog>
	)
}
