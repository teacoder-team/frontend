import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type { TelegramAuthRequest } from '../generated'
import { connectWithTelegram } from '../requests'

export const useTelegramConnect = (
	options?: Omit<
		UseMutationOptions<boolean, unknown, TelegramAuthRequest>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['telegram connect'],
		mutationFn: connectWithTelegram,
		...options
	})
