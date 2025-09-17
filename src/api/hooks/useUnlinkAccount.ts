import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { unlinkAccount } from '../requests'

export const useUnlinkAccount = (
	options?: Omit<
		UseMutationOptions<unknown, unknown, { provider: 'google' | 'github' }>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['unlink account'],
		mutationFn: ({ provider }: { provider: 'google' | 'github' }) =>
			unlinkAccount(provider),
		...options
	})
