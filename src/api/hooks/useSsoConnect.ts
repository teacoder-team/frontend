import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type { SsoConnectResponse } from '../generated'
import { getConnectUrl } from '../requests'

export const useSsoConnect = (
	options?: Omit<
		UseMutationOptions<
			SsoConnectResponse,
			unknown,
			{ provider: 'google' | 'github' }
		>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['sso connect'],
		mutationFn: ({ provider }: { provider: 'google' | 'github' }) =>
			getConnectUrl(provider),
		...options
	})
