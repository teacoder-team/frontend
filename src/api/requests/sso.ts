import type { SsoConnectResponse, SsoStatusResponse } from '../generated'
import { api, instance } from '../instance'

export const fetchSsoStatus = async () =>
	await instance
		.get<SsoStatusResponse>('/auth/sso')
		.then(response => response.data)

export const getAvailableSsoProviders = async () =>
	await api.get<string[]>('/auth/sso/available').then(res => res.data)

export const getAuthUrl = async (provider: string) =>
	await instance
		.post<SsoConnectResponse>(`/auth/sso/login/${provider}`)
		.then(response => response.data)

export const getConnectUrl = async (provider: string) =>
	await instance
		.post<SsoConnectResponse>(`/auth/sso/connect/${provider}`)
		.then(response => response.data)

export const unlinkAccount = async (provider: string) =>
	await instance.delete(`/auth/sso/${provider}`)
