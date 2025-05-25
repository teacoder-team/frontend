import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Key, KeyRound, Smartphone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

import { AuthWrapper } from './auth-wrapper'
import { api, instance } from '@/src/api'
import { LoginSessionResponse } from '@/src/generated'
import { setSessionToken } from '@/src/lib/cookies/session'

const totpSchema = z.object({
	totpCode: z
		.string()
		.min(6, { message: 'Введите корректный код' })
		.max(6, { message: 'Код должен быть 6 символов' })
})

const recoverySchema = z.object({
	recoveryCode: z
		.string()
		.min(11, { message: 'Введите корректный код восстановления' })
		.max(11, { message: 'Код должен быть 11 символов' })
})

type Mfa = z.infer<typeof totpSchema | typeof recoverySchema>

interface MfaFormProps {
	ticket: string
	methods: string[]
}

export function MfaForm({ ticket, methods }: MfaFormProps) {
	const { push } = useRouter()

	const [method, setMethod] = useState<'totp' | 'passkey' | 'recovery'>(
		'totp'
	)

	const schema = method === 'totp' ? totpSchema : recoverySchema

	const form = useForm<Mfa>({
		resolver: zodResolver(schema),
		defaultValues: {
			totpCode: '',
			recoveryCode: ''
		}
	})

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['verify mfa'],
		mutationFn: async (data: Mfa) => {
			const payload =
				method === 'totp'
					? // @ts-ignore
						{ ticket, totpCode: data.totpCode }
					: // @ts-ignore
						{ ticket, recoveryCode: data.recoveryCode }

			const response = await api.post<LoginSessionResponse>(
				'/auth/mfa/verify',
				payload
			)

			return response.data
		},
		onSuccess(data) {
			setSessionToken(data.token)

			instance.defaults.headers['X-Session-Token'] = data.token

			push('/account/settings')
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message || 'Ошибка при верификации'
			)
		}
	})

	async function onSubmit(data: Mfa) {
		mutateAsync(data)
	}

	return (
		<AuthWrapper
			heading='Подтверждение входа'
			description='Для продолжения введите код из приложения-аутентификатора или воспользуйтесь кодом восстановления.'
		>
			<Tabs
				defaultValue='totp'
				className='w-full'
				onValueChange={value => {
					form.reset()
					setMethod(value as 'totp' | 'passkey' | 'recovery')
				}}
			>
				<TabsList className='mb-4 grid w-full grid-cols-3'>
					<TabsTrigger
						value='totp'
						className='flex items-center data-[state=active]:text-blue-600'
					>
						<Smartphone className='mr-2 size-4' />
						TOTP-код
					</TabsTrigger>
					<TabsTrigger
						value='passkey'
						className='flex items-center data-[state=active]:text-blue-600'
					>
						<Smartphone className='mr-2 size-4' />
						Ключ доступа
					</TabsTrigger>
					<TabsTrigger
						value='recovery'
						className='flex items-center data-[state=active]:text-blue-600'
					>
						<KeyRound className='mr-2 size-4' />
						Код восстановления
					</TabsTrigger>
				</TabsList>
			</Tabs>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						{method === 'totp' && (
							<FormField
								control={form.control}
								name='totpCode'
								render={({ field }) => (
									<FormItem>
										<FormLabel>TOTP-код</FormLabel>
										<FormControl>
											<Input
												placeholder='XXXXXX'
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{method === 'passkey' && (
							<div>Использовать ключ доступа</div>
						)}
						{method === 'recovery' && (
							<FormField
								control={form.control}
								name='recoveryCode'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Код восстановления
										</FormLabel>
										<FormControl>
											<Input
												placeholder='XXXXX-XXXXX'
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<Button
							type='submit'
							variant='primary'
							isLoading={isPending}
							className='w-full'
						>
							Подтвердить
						</Button>
					</div>
				</form>
			</Form>
		</AuthWrapper>
	)
}
