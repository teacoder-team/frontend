import { useEffect, useState } from 'react'

import { sessionCookies } from '../lib/cookies/session'

export function useAuth() {
	const [isAuthorized, setIsAuthorized] = useState(false)

	useEffect(() => {
		const token = sessionCookies.get()

		setIsAuthorized(token !== undefined && token !== '')
	}, [])

	return {
		isAuthorized
	}
}
