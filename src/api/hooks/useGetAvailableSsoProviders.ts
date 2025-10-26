import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getAvailableSsoProviders } from '../requests'

export const useGetAvailableSsoProviders = (
	options?: Omit<UseQueryOptions<string[], unknown>, 'queryKey' | 'queryFn'>
) =>
	useQuery({
		queryKey: ['get available sso providers'],
		queryFn: getAvailableSsoProviders,
		...options
	})
