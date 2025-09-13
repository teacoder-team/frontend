import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type {
	LoginMfaResponse,
	LoginRequest,
	LoginSessionResponse
} from '../generated'
import { login } from '../requests'

export const useLogin = (
	options: Omit<
		UseMutationOptions<
			LoginSessionResponse | LoginMfaResponse,
			unknown,
			LoginRequest
		>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['login'],
		mutationFn: (data: LoginRequest) => login(data),
		...options
	})
