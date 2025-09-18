'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Captcha } from '../shared/captcha'
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
import { MfaForm } from './mfa-form'
import { useLogin } from '@/src/api/hooks'
import { instance } from '@/src/api/instance'
import { ROUTES } from '@/src/constants'
import { setSessionToken } from '@/src/lib/cookies/session'

const loginSchema = z.object({
	email: z
		.string()
		.email({ message: 'Введите корректный адрес электронной почты' }),
	password: z
		.string()
		.min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
		.max(128, { message: 'Пароль должен содержать не более 128 символов' }),
	captcha: z.string()
})

export type Login = z.infer<typeof loginSchema>

export function LoginForm() {
	const [methods, setMethods] = useState<string[]>([])
	const [ticket, setTicket] = useState<string | null>(null)

	const { push } = useRouter()
	const searchParams = useSearchParams()

	const { mutateAsync, isPending } = useLogin({
		onSuccess(data) {
			if ('ticket' in data && typeof data.ticket === 'string') {
				setTicket(data.ticket)
				// @ts-ignore
				setMethods(data.allowedMethods)
			}

			if ('token' in data && typeof data.token === 'string') {
				setSessionToken(data.token)

				instance.defaults.headers['X-Session-Token'] = data.token

				const redirectTo =
					searchParams.get('redirectTo') || ROUTES.ACCOUNT.ROOT

				push(redirectTo)
			}
		},
		onError(error: any) {
			toast.error(error.response?.data?.message ?? 'Ошибка при входе')
		}
	})

	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
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

	async function onSubmit(data: Login) {
		if (!data.captcha) {
			toast.warning('Пройдите капчу!')
			return
		}

		await mutateAsync(data)
	}

	return methods.length ? (
		<MfaForm ticket={ticket ?? ''} methods={methods} />
	) : (
		<AuthWrapper
			heading='Войти в аккаунт'
			description='Для входа на сайт используйте ваш email и пароль, которые были указаны при регистрации на сайте'
			bottomText='Еще нет аккаунта?'
			bottomLinkText='Регистрация'
			bottomLinkHref={ROUTES.AUTH.REGISTER}
			isShowSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Почта</FormLabel>
									<FormControl>
										<Input
											placeholder='tony@starkindustries.com'
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
											href={ROUTES.AUTH.RECOVERY}
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
						<FormField
							control={form.control}
							name='captcha'
							render={({ field }) => (
								<FormItem className='flex w-full flex-col items-center justify-center'>
									<FormControl>
										<Captcha
											onVerify={token =>
												form.setValue('captcha', token)
											}
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							variant='primary'
							size='lg'
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
