import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type { CreateUserRequest, CreateUserResponse } from '../generated'
import { createAccount } from '../requests'

export const useRegister = (
	options: Omit<
		UseMutationOptions<CreateUserResponse, unknown, CreateUserRequest>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['register'],
		mutationFn: (data: CreateUserRequest) => createAccount(data),
		...options
	})
