export const ROUTES = {
	HOME: '/',
	ABOUT: '/about',
	PREMIUM: '/premium',
	AUTH: {
		LOGIN: (redirectTo?: string) =>
			redirectTo ? `/auth/login?redirectTo=${redirectTo}` : '/auth/login',
		REGISTER: '/auth/register',
		RECOVERY: '/auth/recovery'
	},
	DOCUMENTS: {
		PRIVACY: '/document/privacy-policy',
		TERMS: '/document/terms-of-use'
	},
	COURSES: {
		ROOT: '/courses',
		SINGLE: (slug: string) => `/courses/${slug}`,
		LESSON: (slug: string) => `/lesson/${slug}`
	},
	ACCOUNT: {
		ROOT: '/account',
		SETTINGS: '/account/settings',
		SESSIONS: '/account/sessions',
		CONNECTIONS: '/account/connections'
	}
}
