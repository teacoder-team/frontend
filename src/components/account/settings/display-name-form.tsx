import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../../ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../../ui/form'
import { Input } from '../../ui/input'

import { patchUser } from '@/src/api'
import type { AccountResponse } from '@/src/generated'

const displayNameSchema = z.object({
	displayName: z.string({ message: 'Имя обязательно' })
})

export type DisplayName = z.infer<typeof displayNameSchema>

interface DisplayNameFormProps {
	user: AccountResponse | undefined
}

export function DisplayNameForm({ user }: DisplayNameFormProps) {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['patch user'],
		mutationFn: (data: DisplayName) => patchUser(data),
		onSuccess() {
			toast.success('Профиль обновлён')
		},
		onError(error) {
			toast.error(error.message ?? 'Ошибка при обновлении профиля')
		}
	})

	const form = useForm<DisplayName>({
		resolver: zodResolver(displayNameSchema),
		values: {
			displayName: user?.displayName ?? ''
		}
	})

	const { isDirty } = form.formState

	async function onSubmit(data: DisplayName) {
		await mutateAsync(data)
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-4'
				>
					<FormField
						control={form.control}
						name='displayName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ваше имя</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='John Doe'
											disabled={isPending}
											{...field}
										/>
										{isDirty && (
											<div className='absolute bottom-0 right-0 flex h-full items-center justify-center px-2'>
												<Button
													variant='primary'
													className='h-6 rounded-lg px-3 text-xs'
													isLoading={isPending}
												>
													Сохранить
												</Button>
											</div>
										)}
									</div>
								</FormControl>
								<FormDescription>
									Измените ваше имя на любое, какое захотите.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	)
}
