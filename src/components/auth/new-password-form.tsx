'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
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
import { passwordReset } from '@/src/api'

const newPasswordSchema = z.object({
	token: z.string().max(128, { message: 'Некорректный токен' }),
	password: z
		.string()
		.min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
		.max(128, { message: 'Пароль должен содержать не более 128 символов' })
})

export type NewPassword = z.infer<typeof newPasswordSchema>

export function NewPasswordForm() {
	const { push } = useRouter()
	const { token } = useParams<{ token: string }>()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['password reset'],
		mutationFn: (data: NewPassword) => passwordReset(data),
		onSuccess() {
			push('/auth/login')
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при регистрации'
			)
		}
	})

	const form = useForm<NewPassword>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			token: '',
			password: ''
		}
	})

	useEffect(() => {
		form.reset()
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: NewPassword) {
		await mutateAsync({
			token,
			password: data.password
		})
	}

	return (
		<AuthWrapper
			heading='Новый пароль'
			description='Установите новый пароль для вашего аккаунта'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-4'
				>
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
				</form>
			</Form>
		</AuthWrapper>
	)
}
