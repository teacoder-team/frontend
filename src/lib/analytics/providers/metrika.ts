declare global {
	interface Window {
		ym?: any
	}
}

export const metrikaProvider = {
	init() {},

	track(event: string, data?: Record<string, any>) {
		if (typeof window !== 'undefined' && typeof window.ym === 'function') {
			window.ym(
				Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID),
				'reachGoal',
				event,
				data
			)
		}
	}
}
