import { track } from './index'

export const analytics = {
	auth: {
		login: {
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
			}
		}
	}
}
