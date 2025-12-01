'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '../components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '../components/ui/card'

import { logout } from '@/src/api/requests'
import { getActiveRestriction } from '@/src/api/requests'
import { useAuth } from '@/src/hooks'

export function BanChecker() {
	const [isVisible, setIsVisible] = useState(true)
	const { isAuthorized } = useAuth()

	const router = useRouter()

	const { data, isLoading } = useQuery({
		queryKey: ['get active restriction'],
		queryFn: () => getActiveRestriction(),
		enabled: isAuthorized
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => logout(),
		onSuccess() {
			setIsVisible(false)
			router.push('/auth/login')
		},
		onError(error: any) {
			toast.error(error.response?.data?.message ?? 'Ошибка при выходе')
		}
	})

	if (!isAuthorized || isLoading || !data || !isVisible) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm'>
			<Card className='w-full max-w-md border-destructive shadow-lg duration-300 animate-in fade-in zoom-in'>
				<CardHeader className='border-b border-border pb-4'>
					<div className='flex items-center gap-2'>
						<AlertTriangle className='h-6 w-6 text-destructive' />
						<CardTitle className='text-destructive'>
							Аккаунт заблокирован
						</CardTitle>
					</div>
					<CardDescription className='text-destructive/80'>
						Ваш аккаунт был заблокирован в связи с нарушением правил
						использования платформы.
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4 pt-6'>
					<div className='space-y-1'>
						<p className='text-sm font-medium'>Причина:</p>
						<p className='text-muted-foreground'>
							{data.reason === 'INAPPROPRIATE_USERNAME' && (
								<>Неподобающие имя пользователя</>
							)}
							{data.reason === 'SPAM' && (
								<>Распространение спама</>
							)}
							{data.reason === 'OFFENSIVE_BEHAVIOR' && (
								<>Неприемлемое поведение</>
							)}
						</p>
					</div>
					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-1'>
							<p className='text-sm font-medium'>
								Дата блокировки:
							</p>
							<p className='text-muted-foreground'>
								{new Date(data.createdAt).toLocaleDateString(
									'ru-RU'
								)}
							</p>
						</div>
						<div className='space-y-1'>
							<p className='text-sm font-medium'>
								Дата окончания:
							</p>
							<p className='text-muted-foreground'>
								{data.until}
							</p>
						</div>
					</div>
					<div className='rounded-md bg-muted p-3 text-sm'>
						<p>
							Также мы отправили вам письмо с детальной
							информацией на ваш почтовый ящик.
						</p>
						<p className='mt-2'>
							Если вы считаете, что это ошибка, пожалуйста,
							свяжитесь с нами по адресу{' '}
							<span className='font-medium'>
								support@teacoder.ru
							</span>
						</p>
					</div>
				</CardContent>
				<CardFooter className='border-t border-border pt-4'>
					<Button
						variant='destructive'
						className='w-full'
						onClick={() => mutate()}
						isLoading={isPending}
					>
						Выйти из аккаунта
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
