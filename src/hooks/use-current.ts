import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { instance } from '../api'
import { getMe } from '../api/account'
import { removeSessionToken } from '../lib/cookies/session'

import { useAuth } from './use-auth'

export function useCurrent() {
	const { isAuthorized } = useAuth()

	const router = useRouter()

	const {
		data: user,
		isLoading,
		error
	} = useQuery({
		queryKey: ['get current'],
		queryFn: () => getMe(),
		retry: false,
		enabled: isAuthorized
	})

	useEffect(() => {
		if (error) {
			removeSessionToken()

			delete instance.defaults.headers['X-Session-Token']

			router.push('/auth/login')
		}
	}, [error, router])

	return {
		user,
		isLoading,
		error
	}
}
