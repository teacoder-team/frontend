import { useQuery } from '@tanstack/react-query'

import { accountAPI } from '../api/account'

export function useCurrent() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => await accountAPI.me()
	})

	return {
		user,
		isLoading
	}
}
