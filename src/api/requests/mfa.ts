import type {
	LoginSessionResponse,
	MfaStatusResponse,
	MfaVerifyRequest,
	PasskeyResponse,
	RegisterPasskeyRequest,
	RegisterPasskeyResponse,
	TotpDisableRequest,
	TotpEnableRequest,
	TotpGenerateSecretResponse
} from '../generated'
import { api, instance } from '../instance'

export const fetchMfaStatus = async () =>
	await instance
		.get<MfaStatusResponse>('/auth/mfa')
		.then(response => response.data)

export const fetchRecovery = async () =>
	await instance
		.get<string[]>('/auth/mfa/recovery')
		.then(response => response.data)

export const regenerateRecovery = () =>
	instance.patch<string>('/auth/mfa/recovery')

export const totpEnable = (data: TotpEnableRequest) =>
	instance.put('/auth/mfa/totp', data)

export const totpGenerateSecret = async () =>
	await instance
		.post<TotpGenerateSecretResponse>('/auth/mfa/totp')
		.then(response => response.data)

export const totpDisable = (data: TotpDisableRequest) =>
	instance.delete('/auth/mfa/totp', { data })

export const verifyMfa = (data: MfaVerifyRequest) =>
	api
		.post<LoginSessionResponse>('/auth/mfa/verify', data)
		.then(response => response.data)
