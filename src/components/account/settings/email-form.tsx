import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, CheckCircle, Mail, MoreHorizontal, Pencil } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Badge } from '../../ui/badge'
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../ui/dropdown-menu'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../../ui/form'
import { Input } from '../../ui/input'

import type { AccountResponse } from '@/src/api/generated'
import { changeEmail, sendEmailVerification } from '@/src/api/requests'

const emailSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email обязателен' })
		.email({ message: 'Введите корректный адрес электронной почты' })
})

export type Email = z.infer<typeof emailSchema>

interface EmailFormProps {
	user: AccountResponse | undefined
}

export function EmailForm({ user }: EmailFormProps) {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate: send } = useMutation({
		mutationKey: ['send email verification'],
		mutationFn: () => sendEmailVerification(),
		onSuccess() {
			toast.success(
				'Ссылка c подтверждением была отправлена на выш почтовый адрес'
			)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при отправке письма'
			)
		}
	})

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['change email'],
		mutationFn: (data: Email) => changeEmail(data),
		onSuccess() {
			form.reset()
			setIsOpen(false)
			queryClient.invalidateQueries({ queryKey: ['get me'] })
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при смене почты'
			)
		}
	})

	const form = useForm<Email>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: ''
		}
	})

	async function onSubmit(data: Email) {
		await mutateAsync(data)
	}

	return (
		<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
			<div className='mr-5 flex w-full items-start gap-x-4 md:w-auto md:items-center'>
				<div className='hidden rounded-full bg-blue-600 p-2.5 md:flex'>
					<Mail className='size-5 stroke-[1.7px] text-white' />
				</div>
				<div className='flex w-full flex-col'>
					<div className='mb-1 flex items-center gap-2'>
						<h2 className='font-semibold'>Почта</h2>
						{user?.isEmailVerified ? (
							<Badge variant='success'>Подтверждёна</Badge>
						) : (
							<Badge variant='error'>Не подтверждёна</Badge>
						)}
					</div>
					<p className='text-sm text-muted-foreground'>
						Ваша учетная запись привязана к адресу{' '}
						<span className='font-medium text-primary'>
							{user?.email}
						</span>
						. На него мы отправляем важные уведомления и информацию
						о безопасности.
					</p>
				</div>
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild className='border-none ring-0'>
						<Button variant='ghost' size='icon'>
							<MoreHorizontal className='size-5' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' side='top'>
						<DropdownMenuGroup>
							{!user?.isEmailVerified && (
								<DropdownMenuItem onClick={() => send()}>
									<CheckCircle />
									Подтвердить
								</DropdownMenuItem>
							)}
							<DropdownMenuItem onClick={() => setIsOpen(true)}>
								<Pencil />
								Изменить
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>

				<Dialog
					open={isOpen}
					onOpenChange={state => {
						form.reset()
						setIsOpen(state)
					}}
				>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Обновление почты</DialogTitle>
							<DialogDescription>
								Введите новый почтовый адрес.
							</DialogDescription>
						</DialogHeader>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='grid gap-4'
							>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Почта</FormLabel>
											<FormControl>
												<Input
													placeholder={user?.email}
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
