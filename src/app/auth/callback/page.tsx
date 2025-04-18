'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { instance } from '@/src/api'
import { setSessionToken } from '@/src/lib/cookies/session'

export default function AuthCallbackPage() {
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const token = searchParams.get('token')

		if (typeof token === 'string') {
			setSessionToken(token)

			instance.defaults.headers['X-Session-Token'] = token

			router.push('/account/settings')
		}
	}, [router])

	return <div>Пожалуйста, подождите, выполняется вход...</div>
}
