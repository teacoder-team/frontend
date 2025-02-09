import type { Login } from '../components/auth/login-form'
import { sessionCookies } from '../lib/cookies/session'
import type { AuthResponse } from '../types/auth'

import { api, instance } from './api'

class SessionAPI {
	public async login(data: Login) {
		const response = await api.post<AuthResponse>(
			'/auth/session/login',
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

	public async logout() {
		const response = await instance
			.post<boolean>('/auth/session/logout')
			.then(() => sessionCookies.remove())

		return response
	}
}

export const sessionAPI = new SessionAPI()
