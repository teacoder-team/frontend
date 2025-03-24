'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
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
import { sendPasswordReset } from '@/src/api'

const resetPasswordSchema = z.object({
	email: z
		.string()
		.email({ message: 'Введите корректный адрес электронной почты' }),
	captcha: z.string()
})

export type ResetPassword = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['send password reset'],
		mutationFn: (data: ResetPassword) => sendPasswordReset(data),
		onSuccess() {
			form.reset()
			toast.success('Письмо с инструкциями отправлено на вашу почту')
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при сбросе пароля'
			)
		}
	})

	const form = useForm<ResetPassword>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: '',
			captcha: ''
		}
	})

	useEffect(() => {
		if (form.formState.isSubmitSuccessful && form.getValues('captcha')) {
			form.reset()
		}
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: ResetPassword) {
		if (!data.captcha) {
			toast.warning('Пройдите капчу!')
			return
		}

		await mutateAsync(data)
	}

	return (
		<AuthWrapper
			heading='Сброс пароля'
			description='Введите вашу почту, чтобы получить ссылку для сброса пароля'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/login'
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
