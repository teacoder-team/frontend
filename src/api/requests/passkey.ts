import {
	GeneratePasskeyOptionsResponse,
	PasskeyResponse,
	RegisterPasskeyRequest,
	RegisterPasskeyResponse
} from '../generated'
import { api, instance } from '../instance'

export const fetchPasskeys = () =>
	instance
		.get<PasskeyResponse[]>('/auth/passkey')
		.then(response => response.data)

export const registerPasskey = (data: RegisterPasskeyRequest) =>
	instance
		.post<RegisterPasskeyResponse>('/auth/passkey', data)
		.then(response => response.data)

export const generateLoginOptions = () =>
	api.post('/auth/passkey/login-options').then(response => response.data)

export const passkeyLogin = (data: any) =>
	api.post('/auth/passkey/login', data).then(response => response.data)

export const generatePasskeyOptions = () =>
	instance
		.post<GeneratePasskeyOptionsResponse>('/auth/passkey/register-options')
		.then(response => response.data)

export const deletePasskey = (id: string) =>
	instance
		.delete<boolean>(`/auth/passkey/${id}`)
		.then(response => response.data)
