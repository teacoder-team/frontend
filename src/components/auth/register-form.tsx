'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Turnstile from 'react-turnstile'
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
import { createAccount } from '@/src/api'

const registerSchema = z.object({
	name: z.string().min(1, { message: 'Имя обязательно' }),
	email: z
		.string()
		.min(1, { message: 'Email обязателен' })
		.email({ message: 'Введите корректный адрес электронной почты' }),
	password: z
		.string()
		.min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
		.max(128, { message: 'Пароль должен содержать не более 128 символов' }),
	captcha: z.string()
})

export type Register = z.infer<typeof registerSchema>

export function RegisterForm() {
	const { push } = useRouter()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: Register) => createAccount(data),
		onSuccess() {
			push('/account')
		},
		onError(error) {
			toast.error(error.message ?? 'Ошибка при регистрации')
		}
	})

	const form = useForm<Register>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			captcha: ''
		}
	})

	useEffect(() => {
		if (form.formState.isSubmitSuccessful && form.getValues('captcha')) {
			form.reset()
		}
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: Register) {
		if (!data.captcha) {
			toast.warning('Пройдите капчу!')
			return
		}

		await mutateAsync(data)
	}

	return (
		<AuthWrapper
			heading='Создать аккаунт'
			description='Для регистрации достаточно ввести своё имя, email и придумать пароль'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input
											placeholder='John Doe'
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
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Почта</FormLabel>
									<FormControl>
										<Input
											placeholder='email@teacoder.ru'
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
						<FormField
							control={form.control}
							name='captcha'
							render={({ field }) => (
								<FormItem className='flex flex-col items-center justify-center'>
									<FormControl>
										<Turnstile
											sitekey={
												process.env[
													'TURNSTILE_SITE_KEY'
												]
											}
											onVerify={token =>
												form.setValue('captcha', token)
											}
											theme='light'
											{...field}
										/>
									</FormControl>
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
