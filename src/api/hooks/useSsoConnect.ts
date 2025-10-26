import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type { SsoConnectResponse } from '../generated'
import { getConnectUrl } from '../requests'

export const useSsoConnect = (
	options?: Omit<
		UseMutationOptions<SsoConnectResponse, unknown, { provider: string }>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['sso connect'],
		mutationFn: ({ provider }: { provider: string }) =>
			getConnectUrl(provider),
		...options
	})
