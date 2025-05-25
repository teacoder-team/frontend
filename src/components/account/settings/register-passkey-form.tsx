import { zodResolver } from '@hookform/resolvers/zod'
import { startRegistration } from '@simplewebauthn/browser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../../ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../../ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../../ui/form'
import { Input } from '../../ui/input'

import { generatePasskeyOptions, registerPasskey } from '@/src/api'
import { RegisterPasskeyRequest } from '@/src/generated'
import { useCurrent } from '@/src/hooks'

const registerPasskeySchema = z.object({
	deviceName: z
		.string()
		.min(3, {
			message: 'Название устройства должно содержать минимум 3 символа'
		})
		.max(50, {
			message: 'Название устройства не должно превышать 50 символов'
		})
})

export type RegisterPasskey = z.infer<typeof registerPasskeySchema>

export function RegisterPasskeyForm() {
	const [isOpen, setIsOpen] = useState(false)

	const { user } = useCurrent()

	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['register passkey'],
		mutationFn: (data: RegisterPasskeyRequest) => registerPasskey(data),
		onSuccess() {
			form.reset()
			queryClient.invalidateQueries({ queryKey: ['mfa status'] })
			setIsOpen(false)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Ошибка при создании ключа доступа'
			)
		}
	})

	const form = useForm<RegisterPasskey>({
		resolver: zodResolver(registerPasskeySchema),
		defaultValues: {
			deviceName: ''
		}
	})

	async function onSubmit(data: RegisterPasskey) {
		const options = await generatePasskeyOptions({
			deviceName: data.deviceName
		})

		const attResp = await startRegistration(options)

		const { id: credentialId, response } = attResp

		const publicKey = response.attestationObject

		const transports = response.transports ?? []

		await mutateAsync({
			deviceName: data.deviceName,
			credentialId,
			publicKey,
			transports
		})
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={state => {
				form.reset()
				setIsOpen(state)
			}}
		>
			<DialogTrigger asChild>
				<Button variant='primary'>Добавить</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[550px] p-0'>
				<DialogHeader className='p-6 pb-0'>
					<DialogTitle>Регистрация ключа доступа</DialogTitle>
					<DialogDescription>
						Введите название устройства для регистрации ключа
						доступа.
					</DialogDescription>
				</DialogHeader>

				<div className='px-6'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='deviceName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Название устройства
										</FormLabel>
										<FormControl>
											<Input
												placeholder='MacBook Pro'
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter className='mt-6 pb-6'>
								<DialogClose asChild>
									<Button variant='outline'>Отмена</Button>
								</DialogClose>
								<Button
									type='submit'
									variant='primary'
									isLoading={isPending}
								>
									Добавить
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
