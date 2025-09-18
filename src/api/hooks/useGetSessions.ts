import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import type { SessionResponse } from '../generated'
import { getSessions } from '../requests'

export const useGetSessions = (
	options?: Omit<
		UseQueryOptions<SessionResponse[], unknown>,
		'queryKey' | 'queryFn'
	>
) =>
	useQuery({
		queryKey: ['get sessions'],
		queryFn: getSessions,
		...options
	})
