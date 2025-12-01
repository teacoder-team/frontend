'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { ReactNode, useEffect } from 'react'

import { attachAnalyticsTriggers } from '../lib/analytics/trigger'

export function AnalyticsProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
			api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
			person_profiles: 'always',
			defaults: '2025-05-24'
		})

		attachAnalyticsTriggers()
	}, [])

	return <PHProvider client={posthog}>{children}</PHProvider>
}
