import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type { LoginSessionResponse } from '../generated'
import {
	type VerifyRecoveryRequest,
	type VerifyTotpRequest,
	verifyMfa
} from '../requests/mfa'

type MfaVerifyRequest = VerifyTotpRequest | VerifyRecoveryRequest

export const useVerifyMfa = (
	options?: Omit<
		UseMutationOptions<LoginSessionResponse, unknown, MfaVerifyRequest>,
		'mutationKey' | 'mutationFn'
	>
) => {
	return useMutation({
		mutationKey: ['verify mfa'],
		mutationFn: (data: MfaVerifyRequest) => verifyMfa(data),
		...options
	})
}
