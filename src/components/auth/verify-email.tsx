'use client'

import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '../ui/button'

import { AuthWrapper } from './auth-wrapper'
import { verifyEmail } from '@/src/api/requests'
import { ROUTES } from '@/src/constants'

export function VerifyEmail() {
	const router = useRouter()
	const { token } = useParams<{ token: string }>()

	const { mutate, isPending } = useMutation({
		mutationKey: ['verify email'],
		mutationFn: () => verifyEmail(token),
		onSuccess() {
			router.push(ROUTES.ACCOUNT.SETTINGS)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при верификации'
			)
		}
	})

	return (
		<AuthWrapper heading='Верификация почты'>
			<p className='text-sm text-muted-foreground'>
				Чтобы завершить подтверждение почты, нажми на кнопку ниже.
			</p>
			<Button
				variant='primary'
				size='lg'
				className='mt-5 w-full'
				onClick={() => mutate()}
				isLoading={isPending}
			>
				Продолжить
			</Button>
		</AuthWrapper>
	)
}
