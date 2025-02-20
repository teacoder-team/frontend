import type {
	MfaStatusResponse,
	TotpDisableRequest,
	TotpEnableRequest,
	TotpGenerateSecretResponse
} from '../generated'

import { instance } from './instance'

export const fetchMfaStatus = () => instance.get<MfaStatusResponse>('/auth/mfa')

export const fetchRecovery = () => instance.get<string[]>('/auth/mfa/recovery')

export const regenerateRecovery = () =>
	instance.patch<string>('/auth/mfa/recovery')

export const totpEnable = (data: TotpEnableRequest) =>
	instance.put('/auth/mfa/totp', data)

export const totpGenerateSecret = () =>
	instance.post<TotpGenerateSecretResponse>('/auth/mfa/totp')

export const totpDisable = (data: TotpDisableRequest) =>
	instance.delete('/auth/mfa/totp', data)
