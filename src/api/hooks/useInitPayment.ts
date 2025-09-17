import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { initPayment } from '../requests/payment'

export const useInitPayment = (
	options: Omit<
		UseMutationOptions<any, unknown, { method: string }>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['login'],
		mutationFn: (data: { method: string }) => initPayment(data),
		...options
	})
