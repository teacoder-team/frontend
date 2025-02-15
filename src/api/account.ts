import type { Password } from '../components/account/settings/password-form'
import type { Register } from '../components/auth/register-form'
import { sessionCookies } from '../lib/cookies/session'
import type { AuthResponse, User } from '../types'

import { api, instance } from './api'

class AccountAPI {
	public async me() {
		const response = await instance.get<User>('/auth/account')

		return response
	}

	public async create(data: Register) {
		const response = await api.post<AuthResponse>(
			'/auth/account/create',
			data
		)

		if (response.token) {
			sessionCookies.set(response.token)

			instance.headers = {
				'X-Session-Token': response.token
			}
		}

		return response
	}

	// public async changeEmail(data: Email) {
	// 	const response = await instance.patch(
	// 		'/auth/account/change/email',
	// 		data
	// 	)

	// 	return response
	// }

	public async changePassword(data: Password) {
		const response = await instance.patch(
			'/auth/account/change/password',
			data
		)

		return response
	}
}

export const accountAPI = new AccountAPI()
