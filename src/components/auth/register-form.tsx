'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Captcha } from '../shared/captcha'
import { EllipsisLoader } from '../shared/ellipsis-loader'
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
import { useRegister } from '@/src/api/hooks'
import { instance } from '@/src/api/instance'
import { ROUTES } from '@/src/constants'
import { useFingerprint } from '@/src/hooks'
import { cookies } from '@/src/lib/cookie'

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
	const { data: fingerprint, error } = useFingerprint()

	const { mutateAsync, isPending } = useRegister({
		onSuccess(data) {
			cookies.set('token', data.token, { expires: 30 })

			instance.defaults.headers['X-Session-Token'] = data.token

			push('/account')
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при регистрации'
			)
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

	async function onSubmit(values: Register) {
		if (!values.captcha) {
			toast.warning('Пройдите капчу!')
			return
		}

		const payload: any = {
			...values
		}

		if (fingerprint && !error) {
			payload.visitorId = fingerprint.visitorId
			payload.requestId = fingerprint.requestId
		}

		await mutateAsync(payload)
	}

	return (
		<AuthWrapper
			heading='Создать аккаунт'
			description='Для регистрации достаточно ввести своё имя, email и придумать пароль'
			bottomText='Уже есть аккаунт?'
			bottomLinkText='Войти'
			bottomLinkHref={ROUTES.AUTH.LOGIN()}
			isShowSocial
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
											placeholder='Tony Stark'
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
