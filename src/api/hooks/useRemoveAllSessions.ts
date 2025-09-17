import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { removeAllSessions } from '../requests'

export const useRemoveAllSessions = (
	options?: Omit<
		UseMutationOptions<unknown, unknown>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['remove all sessions'],
		mutationFn: removeAllSessions,
		...options
	})
