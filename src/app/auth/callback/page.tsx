'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { instance } from '@/src/api/instance'
import { EllipsisLoader } from '@/src/components/shared/ellipsis-loader'
import { setSessionToken } from '@/src/lib/cookies/session'

export default function AuthCallbackPage() {
	const router = useRouter()

	useEffect(() => {
		const hash = window.location.hash
		const token = new URLSearchParams(hash.slice(1)).get('token')

		if (token) {
			setSessionToken(token)
			instance.defaults.headers['X-Session-Token'] = token
			router.push('/account/settings')
		}
	}, [router])

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<EllipsisLoader />
		</div>
	)
}
