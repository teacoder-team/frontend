import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { logout } from '../requests'

export const useLogout = (
	options?: Omit<
		UseMutationOptions<void, unknown, void>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['logout'],
		mutationFn: logout,
		...options
	})
