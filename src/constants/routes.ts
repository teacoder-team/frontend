export const ROUTES = {
	// Common
	home: '/',
	about: '/about',
	articles: '/articles',

	// Auth
	login: (redirectTo?: string) => `/auth/login?redirectTo=${redirectTo}`,
	register: '/auth/register',
	recovery: '/auth/recovery',

	// Documents
	privacy: '/document/privacy-policy',
	terms: '/document/terms-of-use',

	// Courses
	courses: '/courses',
	course: (slug: string) => `/courses/${slug}`,
	lesson: (slug: string) => `/lesson/${slug}`,

	// Account
	progress: '/account',
	settings: '/account/settings',
	sessions: '/account/sessions',
	connections: '/account/connections'
}
