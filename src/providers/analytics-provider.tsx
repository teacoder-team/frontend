'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { ReactNode, useEffect } from 'react'

import { initAnalytics } from '../lib/analytics'
import { attachAnalyticsTriggers } from '../lib/analytics/trigger'

export function AnalyticsProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		initAnalytics()
		attachAnalyticsTriggers()
	}, [])

	return <PHProvider client={posthog}>{children}</PHProvider>
}
