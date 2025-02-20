import type { LoginRequest, LoginResponse } from '../generated'
import { removeSessionToken, setSessionToken } from '../lib/cookies/session'

import { api, instance } from './instance'

export const login = async (data: LoginRequest) => {
	const response = await api.post<LoginResponse>('/auth/session/login', data)

	if (response.token) {
		setSessionToken(response.token)

		instance.headers = {
			'X-Session-Token': response.token
		}
	}

	return response
}

export const logout = async () =>
	await instance
		.post<boolean>('/auth/session/logout')
		.then(() => removeSessionToken())
