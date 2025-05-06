import { getSessionToken } from '../lib/cookies/session'

export function useAuth() {
	const token = getSessionToken()
	const isAuthorized = token !== undefined && token !== ''

	return { isAuthorized }
}
