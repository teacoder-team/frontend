import { cookies } from '../lib/cookie'

export function useAuth() {
	const token = cookies.get('token')
	const isAuthorized = token !== undefined && token !== ''

	return { isAuthorized }
}
