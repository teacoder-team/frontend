'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

import { AuthWrapper } from './auth-wrapper'
import { sessionAPI } from '@/src/api'

const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email обязателен' })
		.email({ message: 'Введите корректный адрес электронной почты' }),
	password: z
		.string()
		.min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
})

export type Login = z.infer<typeof loginSchema>

export function LoginForm() {
	const { push } = useRouter()

	const [methods, setMethods] = useState<string[]>([])

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: async (data: Login) => await sessionAPI.login(data),
		onSuccess(data) {
			if (data.methods) {
				setMethods(data.methods)
			} else {
				toast.success('Вы успешно вошли в аккаунт')
				push('/account')
			}
		},
		onError(error) {
			if (error.message) {
				toast.error(error.message)
			} else {
				toast.error('Ошибка при входе')
			}
		}
	})

	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	useEffect(() => {
		form.reset()
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: Login) {
		await mutateAsync(data)
	}

	return (
		<div className='flex h-[100vh] w-full items-center justify-center'>
			<div className='flex w-full flex-col items-center gap-4'>
				<AuthWrapper
					heading='Войти в аккаунт'
					description='Для входа на сайт используйте ваш email и пароль, которые были указаны при регистрации на сайте'
					backButtonLabel='Еще нет аккаунта? Регистрация'
					backButtonHref='/auth/register'
				>
					{methods.length ? (
						<div>
							<h3>
								Выберите метод двухфакторной аутентификации:
							</h3>
							<ul>
								{methods.map(method => (
									<li key={method}>{method}</li>
								))}
							</ul>
						</div>
					) : (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='grid gap-4'
							>
								<div className='space-y-4'>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Почта</FormLabel>
												<FormControl>
													<Input
														placeholder='email@teacoder.com'
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
										name='password'
										render={({ field }) => (
											<FormItem>
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

									<Button
										type='submit'
										variant='primary'
										isLoading={isPending}
										className='w-full'
									>
										Продолжить
									</Button>
								</div>
							</form>
						</Form>
					)}
				</AuthWrapper>
			</div>
		</div>
	)
}
