import { authEvents } from './events'
import { consoleProvider, metrikaProvider, posthogProvider } from './providers'

const providers = [
	posthogProvider,
	metrikaProvider,
	...(process.env.NODE_ENV === 'development' ? [consoleProvider] : [])
]

export function initAnalytics() {
	if (typeof window === 'undefined') return
	providers.forEach(p => p.init?.())
}

export function track(event: string, data?: Record<string, any>) {
	providers.forEach(p => p.track(event, data))
}

export const analytics = {
	auth: authEvents
}
