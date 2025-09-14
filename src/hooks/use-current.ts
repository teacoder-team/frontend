import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { instance } from '../api/instance'
import { getMe } from '../api/requests'
import { removeSessionToken } from '../lib/cookies/session'

import { useAuth } from './use-auth'

export function useCurrent() {
	const { isAuthorized } = useAuth()

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

			window.location.reload()
		}
	}, [error])

	return {
		user,
		isLoading,
		error
	}
}
