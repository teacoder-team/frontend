import type { EnableTwoFactor } from '../components/account/settings/two-factor-enable'
import type { GenerateTotpResponse } from '../types/mfa'

import { instance } from './api'

class MfaAPI {
	public async generateTotp() {
		const response =
			await instance.post<GenerateTotpResponse>('/auth/mfa/totp')

		return response
	}

	public async enableTotp(data: EnableTwoFactor) {
		const response = await instance.put('/auth/mfa/totp', data)

		return response
	}
}

export const mfaAPI = new MfaAPI()
