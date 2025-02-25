import type {
	LoginMfaResponse,
	LoginRequest,
	LoginSessionResponse,
	SessionResponse
} from '../generated'
import { removeSessionToken } from '../lib/cookies/session'

import { api, instance } from './instance'

export const login = async (data: LoginRequest) => {
	const response = await api.post<LoginSessionResponse | LoginMfaResponse>(
		'/auth/session/login',
		data
	)

	return response
}

export const logout = async () =>
	await instance
		.post<boolean>('/auth/session/logout')
		.then(() => removeSessionToken())

export const getSessions = () =>
	instance.get<SessionResponse[]>('/auth/session/all')

export const revokeSession = (id: string) =>
	instance.delete(`/auth/session/${id}`)

export const removeAllSessions = () => instance.delete('/auth/session/all')
