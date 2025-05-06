import type {
	ExternalConnectResponse,
	ExternalStatusResponse
} from '../generated'

import { instance } from './instance'

export const getAuthUrl = async (provider: 'google' | 'github') =>
	await instance
		.post<ExternalConnectResponse>(`/auth/external/login/${provider}`)
		.then(response => response.data)

export const fetchExternalStatus = async () =>
	await instance
		.get<ExternalStatusResponse>('/auth/external')
		.then(response => response.data)

export const getConnectUrl = async (provider: 'google' | 'github') =>
	await instance
		.post<ExternalConnectResponse>(`/auth/external/connect/${provider}`)
		.then(response => response.data)

export const unlinkAccount = async (provider: 'google' | 'github') =>
	await instance.delete(`/auth/external/${provider}`)
