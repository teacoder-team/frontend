'use client'

import { startAuthentication } from '@simplewebauthn/browser'
import { useMutation } from '@tanstack/react-query'
import { KeyRound } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '../ui/button'

import { generateLoginOptions, passkeyLogin } from '@/src/api/requests'

function base64urlToBuffer(base64url: string): ArrayBuffer {
	const padding = '='.repeat((4 - (base64url.length % 4)) % 4)
	const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/') + padding
	const binary = atob(base64)
	const bytes = new Uint8Array(binary.length)
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i)
	}
	return bytes.buffer
}

export function PasskeyLoginButton() {
	const [isLoading, setIsLoading] = useState(false)

	const { mutate } = useMutation({
		mutationFn: async () => {
			setIsLoading(true)

			// 1. Получаем challenge от сервера
			const options = await generateLoginOptions()

			// 2. Преобразуем поле challenge и credentialID
			// options.challenge = Uint8Array.from(atob(options.challenge), c =>
			// 	c.charCodeAt(0)
			// )

			const authenticationResponse = await startAuthentication(options)

			console.log('PASSKEY AUTH DATA: ', authenticationResponse)

			const login = await passkeyLogin({
				credential: authenticationResponse
			})

			console.log('SUCCESS LOGIN: ', login)
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
			isLoading={isLoading}
		>
			<KeyRound />
			Вход по ключу доступа
		</Button>
	)
}
