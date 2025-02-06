'use client'

import { useQuery } from '@tanstack/react-query'

import { accountAPI } from '@/src/api/account'

export function SettingsForm() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: async () => await accountAPI.me()
	})

	return <div>{isLoading ? <div>Loading...</div> : JSON.stringify(user)}</div>
}
