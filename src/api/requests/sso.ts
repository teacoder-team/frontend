import type { SsoConnectResponse, SsoStatusResponse } from '../generated'
import { instance } from '../instance'

export const fetchSsoStatus = async () =>
	await instance
		.get<SsoStatusResponse>('/auth/sso')
		.then(response => response.data)

export const getAuthUrl = async (provider: 'google' | 'github') =>
	await instance
		.post<SsoConnectResponse>(`/auth/sso/login/${provider}`)
		.then(response => response.data)

export const getConnectUrl = async (provider: 'google' | 'github') =>
	await instance
		.post<SsoConnectResponse>(`/auth/sso/connect/${provider}`)
		.then(response => response.data)

export const unlinkAccount = async (provider: 'google' | 'github') =>
	await instance.delete(`/auth/sso/${provider}`)
