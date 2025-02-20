import { useEffect, useState } from 'react'

import { getSessionToken } from '../lib/cookies/session'

export function useAuth() {
	const [isAuthorized, setIsAuthorized] = useState(false)

	useEffect(() => {
		const token = getSessionToken()

		setIsAuthorized(token !== undefined && token !== '')
	}, [])

	return {
		isAuthorized
	}
}
