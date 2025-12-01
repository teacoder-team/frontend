import { consoleProvider, metrikaProvider, posthogProvider } from './providers'

const providers = [
	posthogProvider,
	metrikaProvider,
	...(process.env.NODE_ENV === 'development' ? [consoleProvider] : [])
]

providers.forEach(p => p.init?.())

export function track(event: string, data?: Record<string, any>) {
	providers.forEach(p => p.track(event, data))
}
