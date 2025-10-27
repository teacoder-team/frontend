'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { TelegramAuthRequest } from '@/src/api/generated'
import { useTelegramAuth } from '@/src/api/hooks'
import { instance } from '@/src/api/instance'
import { EllipsisLoader } from '@/src/components/shared/ellipsis-loader'
import { ROUTES } from '@/src/constants'
import { useFingerprint } from '@/src/hooks'
import { setSessionToken } from '@/src/lib/cookies/session'

function base64DecodeUnicode(str: string) {
	try {
		return decodeURIComponent(
			atob(str.replace(/-/g, '+').replace(/_/g, '/'))
				.split('')
				.map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join('')
		)
	} catch (err) {
		console.error('Ошибка декодирования Base64:', err)
		return null
	}
}

export default function TelegramAuthFinishPage() {
	const router = useRouter()

	const { data: fingerprint } = useFingerprint()

	const { mutate } = useTelegramAuth({
		onSuccess(data) {
			setSessionToken(data.token)

			instance.defaults.headers['X-Session-Token'] = data.token

			router.push(ROUTES.ACCOUNT.ROOT)
		}
	})

	useEffect(() => {
		const hashString = window.location.hash.replace('#tgAuthResult=', '')

		if (hashString) {
			const decoded = base64DecodeUnicode(hashString)

			if (decoded) {
				try {
					const user: TelegramAuthRequest = JSON.parse(decoded)

					if (typeof user !== 'object' || user === null)
						throw new Error('Decoded value is not an object')

					if (fingerprint)
						mutate({
							...user,
							visitorId: fingerprint.visitorId,
							requestId: fingerprint.requestId
						})
				} catch (err) {
					console.error(
						'Ошибка парсинга JSON после декодирования:',
						err
					)
					router.push(ROUTES.AUTH.LOGIN())
				}
			} else {
				router.push(ROUTES.AUTH.LOGIN())
			}
		}
	}, [fingerprint, mutate, router])

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<EllipsisLoader />
		</div>
	)
}
