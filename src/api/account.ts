import type {
	AccountResponse,
	ChangeEmailRequest,
	ChangePasswordRequest,
	CreateUserRequest,
	LoginResponse,
	PasswordResetRequest,
	SendPasswordResetRequest
} from '../generated'
import { setSessionToken } from '../lib/cookies/session'

import { api, instance } from './instance'

export const getMe = () => instance.get<AccountResponse>('/auth/account')

export const createAccount = async (data: CreateUserRequest) => {
	const response = await api.post<LoginResponse>('/auth/account/create', data)

	if (response.token) {
		setSessionToken(response.token)

		instance.headers = {
			'X-Session-Token': response.token
		}
	}

	return response
}

export const sendPasswordReset = (data: SendPasswordResetRequest) =>
	api.post('/auth/account/reset_password', data)

export const passwordReset = (data: PasswordResetRequest) =>
	api.patch('/auth/account/reset_password', data)

export const changeEmail = (data: ChangeEmailRequest) =>
	instance.patch('/auth/account/change/email', data)

export const changePassword = (data: ChangePasswordRequest) =>
	instance.patch('/auth/account/change/password', data)
