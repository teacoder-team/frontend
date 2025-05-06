import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { KeyRound } from 'lucide-react'
import { useEffect, useState } from 'react'
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

import { changePassword } from '@/src/api'

const passwordSchema = z
	.object({
		newPassword: z
			.string()
			.min(6, {
				message: 'Новый пароль должен содержать хотя бы 6 символов'
			})
			.max(128, {
				message: 'Новый пароль должен содержать не более 128 символов'
			}),
		confirmPassword: z.string()
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})

export type Password = z.infer<typeof passwordSchema>

export function PasswordForm() {
	const [isOpen, setIsOpen] = useState(false)

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['change password'],
		mutationFn: (data: Password) => changePassword(data),
		onSuccess() {
			setIsOpen(false)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при смене пароля'
			)
		}
	})

	const form = useForm<Password>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			newPassword: '',
			confirmPassword: ''
		}
	})

	useEffect(() => {
		form.reset()
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: Password) {
		await mutateAsync(data)
	}

	return (
		<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
			<div className='mr-5 flex w-full items-start gap-x-4 md:w-auto md:items-center'>
				<div className='hidden rounded-full bg-blue-600 p-2.5 md:flex'>
					<KeyRound className='size-5 stroke-[1.7px] text-white' />
				</div>
				<div className='flex w-full flex-col'>
					<h2 className='mb-1 font-semibold'>Пароль</h2>
					<p className='text-sm text-muted-foreground'>
						Пароль — ключ к вашей учетной записи. Никому его не
						сообщайте. При необходимости вы можете изменить его
						здесь для повышения безопасности.
					</p>
				</div>
			</div>
			<div>
				<Dialog
					open={isOpen}
					onOpenChange={state => {
						form.reset()
						setIsOpen(state)
					}}
				>
					<DialogTrigger asChild>
						<Button variant='outline'>Изменить</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Обновление пароля</DialogTitle>
							<DialogDescription>
								Введите текущий и новый пароль для обновления.
							</DialogDescription>
						</DialogHeader>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='grid gap-4'
							>
								<FormField
									control={form.control}
									name='newPassword'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Новый пароль</FormLabel>
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
								<FormField
									control={form.control}
									name='confirmPassword'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Подтвердите новый пароль
											</FormLabel>
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
								<DialogFooter>
									<DialogClose asChild>
										<Button variant='outline'>
											Отмена
										</Button>
									</DialogClose>
									<Button
										type='submit'
										variant='primary'
										isLoading={isPending}
									>
										Обновить
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
