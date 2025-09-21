import { PasskeyResponse } from '../generated'
import { instance } from '../instance'

export const fetchPasskeys = () =>
	instance
		.get<PasskeyResponse[]>('/auth/passkey')
		.then(response => response.data)

export const generateRegistrationOptions = () =>
	instance
		.post<any>('/auth/passkey/register/options')
		.then(response => response.data)

export const verifyRegistration = (data: {
	deviceName: string
	attestationResponse: any
}) =>
	instance
		.post<any>('/auth/passkey/register/verify', data)
		.then(response => response.data)

export const generateAuthenticationOptions = (data: { userId: string }) =>
	instance
		.post<any>('/auth/passkey/login/options', data)
		.then(response => response.data)

export const deletePasskey = (id: string) =>
	instance
		.delete<boolean>(`/auth/passkey/${id}`)
		.then(response => response.data)
