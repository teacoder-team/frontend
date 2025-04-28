export const ROUTES = {
	// Common
	home: '/',
	about: '/about',

	// Auth
	login: '/auth/login',
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
