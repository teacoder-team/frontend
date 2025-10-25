import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import type { PaymentMethodResponse } from '../generated'
import { getPaymentMethods } from '../requests'

export const useGetPaymentMethods = (
	options?: Omit<
		UseQueryOptions<PaymentMethodResponse[], unknown>,
		'queryKey' | 'queryFn'
	>
) =>
	useQuery({
		queryKey: ['get payment methods'],
		queryFn: getPaymentMethods,
		...options
	})
