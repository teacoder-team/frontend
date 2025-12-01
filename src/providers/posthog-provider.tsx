'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { ReactNode, useEffect } from 'react'

interface PosthogProviderProps {
	children: ReactNode
}

export function PosthogProvider({ children }: PosthogProviderProps) {
	useEffect(() => {
		posthog.init(process.env['NEXT_PUBLIC_POSTHOG_KEY'] as string, {
			api_host: process.env['NEXT_PUBLIC_POSTHOG_HOST'],
			person_profiles: 'always',
			defaults: '2025-05-24'
		})
	}, [])

	return <PHProvider client={posthog}>{children}</PHProvider>
}
