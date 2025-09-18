import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { InitPaymentRequest } from '../generated'
import { initPayment } from '../requests/payment'

export const useInitPayment = (
	options?: Omit<
		UseMutationOptions<any, unknown, InitPaymentRequest>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['login'],
		mutationFn: (data: InitPaymentRequest) => initPayment(data),
		...options
	})
