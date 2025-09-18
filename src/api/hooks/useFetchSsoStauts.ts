import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import type { SsoStatusResponse } from '../generated'
import { fetchSsoStatus } from '../requests'

export const useFetchSsoStatus = (
	options?: Omit<
		UseQueryOptions<SsoStatusResponse, unknown>,
		'queryKey' | 'queryFn'
	>
) =>
	useQuery({
		queryKey: ['sso status'],
		queryFn: fetchSsoStatus,
		...options
	})
