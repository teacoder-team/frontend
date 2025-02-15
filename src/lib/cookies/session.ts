import Cookies from 'js-cookie'

class SessionCookies {
	public set(token: string): string | undefined {
		return Cookies.set('token', token, {
			domain: process.env['COOKIE_DOMAIN'],
			expires: 30
		})
	}

	public get(): string | undefined {
		return Cookies.get('token')
	}

	public remove(): void {
		return Cookies.remove('token', { domain: process.env['COOKIE_DOMAIN'] })
	}
}

export const sessionCookies = new SessionCookies()
