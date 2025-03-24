import type {
	AccountResponse,
	ChangeEmailRequest,
	ChangePasswordRequest,
	CreateUserRequest,
	CreateUserResponse,
	PasswordResetRequest,
	SendPasswordResetRequest
} from '../generated'
import { setSessionToken } from '../lib/cookies/session'

import { api, instance } from './instance'

export const getMe = async () =>
	await instance
		.get<AccountResponse>('/auth/account')
		.then(response => response.data)

export const createAccount = async (data: CreateUserRequest) => {
	const response = await api.post<CreateUserResponse>(
		'/auth/account/create',
		data
	)

	if (response.data.token) {
		setSessionToken(response.data.token)

		instance.defaults.headers['X-Session-Token'] = response.data.token
	}

	return response.data
}

export const sendPasswordReset = (data: SendPasswordResetRequest) =>
	api.post('/auth/account/reset_password', data)

export const passwordReset = (data: PasswordResetRequest) =>
	api.patch('/auth/account/reset_password', data)

export const changeEmail = (data: ChangeEmailRequest) =>
	instance.patch('/auth/account/change/email', data)

export const changePassword = (data: ChangePasswordRequest) =>
	instance.patch('/auth/account/change/password', data)
