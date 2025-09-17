import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import type { AccountResponse } from '../generated'
import { getMe } from '../requests'

export const useGetMe = (
	options?: Omit<
		UseQueryOptions<AccountResponse, unknown>,
		'queryKey' | 'queryFn'
	>
) =>
	useQuery({
		queryKey: ['get me'],
		queryFn: getMe,
		...options
	})
