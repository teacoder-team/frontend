import { env } from '@/src/config/env'

declare global {
	interface Window {
		ym?: any
	}
}

export const metrikaProvider = {
	init() {},

	track(event: string, data?: Record<string, any>) {
		if (typeof window !== 'undefined' && typeof window.ym === 'function') {
			window.ym(Number(env.YANDEX_METRIKA_ID), 'reachGoal', event, data)
		}
	}
}
