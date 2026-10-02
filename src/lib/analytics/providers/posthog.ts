import posthog from 'posthog-js'

import { env } from '@/lib/config/env'

let isInitialized = false

export const posthogProvider = {
	init() {
		if (
			typeof window === 'undefined' ||
			!env.POSTHOG_KEY ||
			isInitialized
		) {
			return
		}

		isInitialized = true

		posthog.init(env.POSTHOG_KEY, {
			api_host: env.POSTHOG_HOST,
			person_profiles: 'always',
			defaults: '2025-05-24'
		})
	},

	track(event: string, data?: Record<string, unknown>) {
		// Nothing is sent until the visitor allows analytics cookies.
		if (!isInitialized) return

		posthog.capture(event, data)
	}
}
