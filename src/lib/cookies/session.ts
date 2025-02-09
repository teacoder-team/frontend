import Cookies from 'js-cookie'

class SessionCookies {
	public set(token: string): string | undefined {
		return Cookies.set('token', token, {
			domain: '.teacoder.ru',
			expires: 30
		})
	}

	public get(): string | undefined {
		return Cookies.get('token')
	}

	public remove(): void {
		return Cookies.remove('token', { domain: '.teacoder.ru' })
	}
}

export const sessionCookies = new SessionCookies()
