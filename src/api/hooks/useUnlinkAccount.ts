import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { unlinkAccount } from '../requests'

export const useUnlinkAccount = (
	options?: Omit<
		UseMutationOptions<
			unknown,
			unknown,
			{ provider: 'google' | 'github' | 'discord' }
		>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['unlink account'],
		mutationFn: ({
			provider
		}: {
			provider: 'google' | 'github' | 'discord'
		}) => unlinkAccount(provider),
		...options
	})
