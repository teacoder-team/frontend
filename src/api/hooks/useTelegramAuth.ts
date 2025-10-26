import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type { TelegramAuthRequest, TelegramAuthResponse } from '../generated'
import { loginWithTelegram } from '../requests'

export const useTelegramAuth = (
	options?: Omit<
		UseMutationOptions<TelegramAuthResponse, unknown, TelegramAuthRequest>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['telegram oauth finish'],
		mutationFn: loginWithTelegram,
		...options
	})
