import { useEffect } from 'react'

import { useGetMe } from '../api/hooks'
import { instance } from '../api/instance'
import { removeSessionToken } from '../lib/cookies/session'

import { useAuth } from './use-auth'

export function useCurrent() {
	const { isAuthorized } = useAuth()

	const {
		data: user,
		isLoading,
		error
	} = useGetMe({
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
