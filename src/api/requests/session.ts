import type {
	LoginMfaResponse,
	LoginRequest,
	LoginSessionResponse,
	SessionResponse
} from '../generated'
import { api, instance } from '../instance'

export const login = async (data: LoginRequest) =>
	await api
		.post<
			LoginSessionResponse | LoginMfaResponse
		>('/auth/session/login', data)
		.then(response => response.data)

export const logout = async () =>
	await instance.post<boolean>('/auth/session/logout')

export const getSessions = async () =>
	await instance
		.get<SessionResponse[]>('/auth/session/all')
		.then(response => response.data)

export const revokeSession = (id: string) =>
	instance.delete(`/auth/session/${id}`)

export const removeAllSessions = () => instance.delete('/auth/session/all')
