'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
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
import { instance, login } from '@/src/api'
import { setSessionToken } from '@/src/lib/cookies/session'

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
		mutationFn: (data: Login) => login(data),
		onSuccess(data) {
			if ('ticket' in data && typeof data.ticket === 'string') {
				setMethods(data.allowedMethods)
			}

			if ('token' in data && typeof data.token === 'string') {
				setSessionToken(data.token)

				instance.headers = {
					'X-Session-Token': data.token
				}

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

	return methods.length ? (
		<div>Two factor {methods}</div>
	) : (
		<AuthWrapper
			heading='Войти в аккаунт'
			description='Для входа на сайт используйте ваш email и пароль, которые были указаны при регистрации на сайте'
			backButtonLabel='Еще нет аккаунта? Регистрация'
			backButtonHref='/auth/register'
		>
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
									<div className='flex items-center justify-between'>
										<FormLabel>Пароль</FormLabel>
										<Link
											href='/auth/recovery'
											className='ml-auto inline-block text-sm underline'
										>
											Забыли пароль?
										</Link>
									</div>
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
		</AuthWrapper>
	)
}
