import posthog from 'posthog-js'

export const posthogProvider = {
	init() {
		if (typeof window === 'undefined') return

		posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
			api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
			person_profiles: 'always',
			defaults: '2025-05-24'
		})
	},

	track(event: string, data?: Record<string, any>) {
		if (typeof window === 'undefined') return

		posthog.capture(event, data)
	}
}
