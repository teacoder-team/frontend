import { useEffect } from 'react'

import { useGetMe } from '../api/hooks'
import { instance } from '../api/instance'
import { cookies } from '../lib/cookie'

import { useAuth } from './useAuth'

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
			cookies.remove('token')

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
