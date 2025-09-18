import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { revokeSession } from '../requests'

export const useRevokeSession = (
	options?: Omit<
		UseMutationOptions<unknown, unknown, { id: string }>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['revoke session'],
		mutationFn: ({ id }: { id: string }) => revokeSession(id),
		...options
	})
