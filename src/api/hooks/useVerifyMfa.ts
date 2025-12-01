import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type { LoginSessionResponse } from '../generated'
import {
	type VerifyPasskeyRequest,
	type VerifyRecoveryRequest,
	type VerifyTotpRequest,
	verifyMfa
} from '../requests'

type AnalyticsMeta = {
	method?: string
}

export type MfaVerifyRequest =
	| (VerifyTotpRequest & AnalyticsMeta)
	| (VerifyPasskeyRequest & AnalyticsMeta)
	| (VerifyRecoveryRequest & AnalyticsMeta)

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
