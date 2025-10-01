'use client'

import { startAuthentication } from '@simplewebauthn/browser'
import { useMutation } from '@tanstack/react-query'
import { KeyRound } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '../ui/button'

export function PasskeyLoginButton() {
	const [isLoading, setIsLoading] = useState(false)

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			setIsLoading(true)

			// 1. Получаем challenge от сервера
			// const options = await generateLoginOptions()

			// 2. Преобразуем поле challenge и credentialID
			// options.challenge = Uint8Array.from(atob(options.challenge), c =>
			// 	c.charCodeAt(0)
			// )

			// const authenticationResponse = await startAuthentication(options)

			// console.log('PASSKEY AUTH DATA: ', authenticationResponse)

			// const login = await passkeyLogin({
			// 	credential: authenticationResponse
			// })

			// console.log('SUCCESS LOGIN: ', login)
		},
		onError() {
			toast.error('Ошибка входа по ключу')
		},
		onSettled() {
			setIsLoading(false)
		}
	})

	return (
		<Button
			onClick={() => mutate()}
			variant='outline'
			className='[&_svg]:size-5'
			isLoading={isLoading || isPending}
		>
			<KeyRound />
			Вход по ключу доступа
		</Button>
	)
}
