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

const passwordSchema = z.object({
	currentPassword: z.string().min(6).max(128),
	newPassword: z.string().min(6).max(128)
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
		onError(error) {
			if (error.message) {
				toast.warning(error.message)
			} else {
				toast.error('Ошибка при смене пароля')
			}
		}
	})

	const form = useForm<Password>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: ''
		}
	})

	useEffect(() => {
		form.reset()
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: Password) {
		await mutateAsync(data)
	}

	return (
		<div className='flex items-center justify-between'>
			<div className='mr-5 flex items-center gap-x-4'>
				<div className='rounded-full bg-blue-500 p-2.5'>
					<KeyRound className='size-5 stroke-[1.7px] text-white' />
				</div>
				<div className='mr-5'>
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
									name='currentPassword'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Текущий пароль
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
