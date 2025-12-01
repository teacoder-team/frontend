import type {
	AccountResponse,
	ChangeEmailRequest,
	ChangePasswordRequest,
	CreateUserRequest,
	CreateUserResponse,
	PasswordResetRequest,
	SendPasswordResetRequest
} from '../generated'
import { api, instance } from '../instance'

export const getMe = async () =>
	await instance.get<AccountResponse>('/auth/account').then(res => res.data)

export const createAccount = async (data: CreateUserRequest) =>
	await api
		.post<CreateUserResponse>('/auth/account/create', data)
		.then(res => res.data)

export const sendEmailVerification = () => instance.post('/auth/account/verify')

export const verifyEmail = (code: string) =>
	instance.post(`/auth/account/verify/${code}`)

export const sendPasswordReset = (data: SendPasswordResetRequest) =>
	api.post('/auth/account/reset_password', data)

export const passwordReset = (data: PasswordResetRequest) =>
	api.patch('/auth/account/reset_password', data)

export const changeEmail = (data: ChangeEmailRequest) =>
	instance.patch('/auth/account/change/email', data)

export const changePassword = (data: ChangePasswordRequest) =>
	instance.patch('/auth/account/change/password', data)
