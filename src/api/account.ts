import type { Register } from '../components/auth/register-form'
import { sessionCookies } from '../lib/cookies/session'
import type { AuthResponse } from '../types/auth'
import type { User } from '../types/user'

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
}

export const accountAPI = new AccountAPI()
