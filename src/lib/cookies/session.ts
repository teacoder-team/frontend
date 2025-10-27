import Cookies from 'js-cookie'

export const setSessionToken = (token: string) =>
	Cookies.set('token', token, {
		domain: process.env['NEXT_PUBLIC_COOKIE_DOMAIN'],
		expires: 30
	})

export const getSessionToken = () => Cookies.get('token')

export const removeSessionToken = () =>
	Cookies.remove('token', {
		domain: process.env['NEXT_PUBLIC_COOKIE_DOMAIN']
	})
