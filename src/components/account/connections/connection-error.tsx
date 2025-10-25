'use client'

import { AlertTriangle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '../../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '../../ui/card'

export function ConnectionError() {
	const searchParams = useSearchParams()
	const [isVisible, setIsVisible] = useState(false)
	const [errorInfo, setErrorInfo] = useState<{
		title: string
		description: string
		details: string
	} | null>(null)

	useEffect(() => {
		const error = searchParams.get('error')

		if (error === 'already-linked') {
			setErrorInfo({
				title: 'Аккаунт уже привязан',
				description:
					'Этот аккаунт уже привязан к другому пользователю.',
				details:
					'Пожалуйста, используйте другой аккаунт или свяжитесь с поддержкой по адресу support@teacoder.ru, чтобы решить эту проблему.'
			})
			setIsVisible(true)
		} else if (error === 'email-taken') {
			setErrorInfo({
				title: 'Почта уже используется',
				description:
					'Указанная почта уже используется другим аккаунтом.',
				details:
					'Попробуйте использовать другой адрес электронной почты или восстановить доступ к старому аккаунту.'
			})
			setIsVisible(true)
		} else if (error === 'access-denied') {
			setErrorInfo({
				title: 'Доступ запрещён',
				description:
					'Вы отменили авторизацию через внешнего провайдера',
				details:
					'Если это было случайно, попробуйте снова. Иначе используйте другой способ входа или свяжитесь с поддержкой.'
			})
			setIsVisible(true)
		}
	}, [searchParams])

	if (!isVisible || !errorInfo) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm'>
			<Card className='w-full max-w-md shadow-lg duration-300 animate-in fade-in zoom-in'>
				<CardHeader className='border-b border-border pb-4'>
					<div className='flex items-center gap-2'>
						<AlertTriangle className='h-6 w-6' />
						<CardTitle>{errorInfo.title}</CardTitle>
					</div>
					<CardDescription>{errorInfo.description}</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4 pt-6'>
					<div className='rounded-md bg-muted p-3 text-sm'>
						<p>{errorInfo.details}</p>
					</div>
				</CardContent>
				<CardFooter className='border-t border-border pt-4'>
					<Button
						variant='primary'
						className='w-full'
						onClick={() => setIsVisible(false)}
					>
						Понятно
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
