import posthog from 'posthog-js'

import { env } from '@/src/config/env'

export const posthogProvider = {
	init() {
		if (typeof window === 'undefined') return

		posthog.init(env.POSTHOG_KEY as string, {
			api_host: env.POSTHOG_HOST,
			person_profiles: 'always',
			defaults: '2025-05-24'
		})
	},

	track(event: string, data?: Record<string, any>) {
		if (typeof window === 'undefined') return

		posthog.capture(event, data)
	}
}
