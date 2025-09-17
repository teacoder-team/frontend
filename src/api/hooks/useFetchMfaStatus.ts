import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import type { MfaStatusResponse } from '../generated'
import { fetchMfaStatus } from '../requests'

export const useFetchMfaStatus = (
	options?: Omit<
		UseQueryOptions<MfaStatusResponse, unknown>,
		'queryKey' | 'queryFn'
	>
) =>
	useQuery({
		queryKey: ['mfa status'],
		queryFn: fetchMfaStatus,
		...options
	})
