import type { Route } from 'next'

export const ROUTES = {
	HOME: '/' as Route,
	ABOUT: '/about' as Route,
	PREMIUM: '/premium' as Route,

	AUTH: {
		LOGIN: (redirectTo?: string) =>
			(redirectTo
				? `/auth/login?redirectTo=${redirectTo}`
				: '/auth/login') as Route,

		REGISTER: '/auth/register' as Route,
		RECOVERY: '/auth/recovery' as Route
	},

	DOCUMENTS: {
		PRIVACY: '/document/privacy-policy' as Route,
		TERMS: '/document/terms-of-use' as Route
	},

	COURSES: {
		ROOT: '/courses' as Route,

		SINGLE: (slug: string) => `/courses/${slug}` as any,

		LESSON: (slug: string) => `/lesson/${slug}` as any
	},

	ACCOUNT: {
		ROOT: '/account' as Route,
		SETTINGS: '/account/settings' as Route,
		SESSIONS: '/account/sessions' as Route,
		CONNECTIONS: '/account/connections' as Route
	}
} as const
