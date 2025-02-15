import type { DisableTotp } from '../components/account/settings/disable-totp-form'
import type { EnableTotp } from '../components/account/settings/enable-totp-form'
import type { MfaStatus, TotpGenerateResponse } from '../types'

import { instance } from './api'

class MfaAPI {
	public async fetchStatus() {
		const response = await instance.get<MfaStatus>('/auth/mfa')

		return response
	}

	public async fetchRecovery() {
		const response = await instance.get<string[]>('/auth/mfa/recovery')

		return response
	}

	public async regenerateRecovery() {
		const response = await instance.patch('/auth/mfa/recovery')

		return response
	}

	public async totpEnable(data: EnableTotp) {
		const response = await instance.put('/auth/mfa/totp', data)

		return response
	}

	public async totpGenerateSecret() {
		const response =
			await instance.post<TotpGenerateResponse>('/auth/mfa/totp')

		return response
	}

	public async totpDisable(data: DisableTotp) {
		const response = await instance.delete('/auth/mfa/totp', data)

		return response
	}
}

export const mfaAPI = new MfaAPI()
