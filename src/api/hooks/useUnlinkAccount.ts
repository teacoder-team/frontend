import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { unlinkAccount } from '../requests'

export const useUnlinkAccount = (
	options?: Omit<
		UseMutationOptions<unknown, unknown, { provider: string }>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['unlink account'],
		mutationFn: ({ provider }: { provider: string }) =>
			unlinkAccount(provider),
		...options
	})
