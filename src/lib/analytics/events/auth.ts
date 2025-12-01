import { track } from '../index'

export const authEvents = {
	login: {
		view() {
			track('auth_login_view')
		},
		emailInput() {
			track('auth_login_email_input')
		},
		passwordInput() {
			track('auth_login_password_input')
		},
		click() {
			track('auth_login_click')
		},
		submit() {
			track('auth_login_submit')
		},
		success() {
			track('auth_login_success')
		},
		fail(message?: string) {
			track('auth_login_fail', { message })
		},
		mfaRequested(methods: string[]) {
			track('auth_login_mfa_requested', { methods })
		}
	},
	register: {
		view() {
			track('auth_register_view')
		},
		nameInput() {
			track('auth_register_name_input')
		},
		emailInput() {
			track('auth_register_email_input')
		},
		passwordInput() {
			track('auth_register_password_input')
		},
		click() {
			track('auth_register_click')
		},
		submit() {
			track('auth_register_submit')
		},
		success() {
			track('auth_register_success')
		},
		fail(message?: string) {
			track('auth_register_fail', { message })
		}
	},
	social: {
		click(provider: string) {
			track('auth_social_click', { provider })
		},
		redirect(provider: string) {
			track('auth_social_redirect', { provider })
		},
		fail(provider: string, message?: string) {
			track('auth_social_fail', { provider, message })
		},
		success(provider: string) {
			track('auth_social_success', { provider })
		}
	},
	mfa: {
		methodsShown(methods: string[]) {
			track('auth_mfa_methods_shown', { methods })
		},
		select(method: string) {
			track('auth_mfa_select_method', { method })
		},
		submit(method: string) {
			track('auth_mfa_submit', { method })
		},
		success(method: string) {
			track('auth_mfa_success', { method })
		},
		fail(method: string, message?: string) {
			track('auth_mfa_fail', { method, message })
		},
		passkeyStart() {
			track('auth_mfa_passkey_start')
		},
		passkeySuccess() {
			track('auth_mfa_passkey_success')
		},
		passkeyFail(message?: string) {
			track('auth_mfa_passkey_fail', { message })
		}
	},
	resetPassword: {
		view() {
			track('auth_reset_password_view')
		},
		submit() {
			track('auth_reset_password_submit')
		},
		success() {
			track('auth_reset_password_success')
		},
		fail(message?: string) {
			track('auth_reset_password_fail', { message })
		}
	},
	newPassword: {
		view() {
			track('auth_new_password_view')
		},
		submit() {
			track('auth_new_password_submit')
		},
		success() {
			track('auth_new_password_success')
		},
		fail(message?: string) {
			track('auth_new_password_fail', { message })
		}
	}
}
