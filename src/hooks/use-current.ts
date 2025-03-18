import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
		queryKey: ['profile'],
		queryFn: () => getMe(),
		retry: false,
		enabled: isAuthorized
	})

	useEffect(() => {
		if (error) {
			removeSessionToken()

			router.push('/auth/login')
		}
	}, [error, router])

	return {
		user,
		isLoading,
		error
	}
}
