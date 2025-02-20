import { useQuery } from '@tanstack/react-query'

import { getMe } from '../api/account'

export function useCurrent() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => getMe()
	})

	return {
		user,
		isLoading
	}
}
