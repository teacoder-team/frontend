export interface CookieSetOptions {
	domain?: string
	path?: string
	expires?: number | Date
	secure?: boolean
	httpOnly?: boolean
	sameSite?: 'lax' | 'strict' | 'none'
}

const DEFAULT_DOMAIN =
	typeof process !== 'undefined'
		? process.env.NEXT_PUBLIC_COOKIES_DOMAIN
		: undefined

function serializeCookie(
	name: string,
	value: string,
	options: CookieSetOptions = {}
): string {
	let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

	if (options.expires) {
		const expires =
			typeof options.expires === 'number'
				? new Date(Date.now() + options.expires * 864e5)
				: options.expires

		cookie += `; Expires=${expires.toUTCString()}`
	}

	cookie += `; Path=${options.path ?? '/'}`

	const domain = options.domain ?? DEFAULT_DOMAIN
	if (domain) cookie += `; Domain=${domain}`

	if (options.secure !== false) cookie += `; Secure`
	if (options.httpOnly) cookie += `; HttpOnly`
	if (options.sameSite) cookie += `; SameSite=${options.sameSite}`

	return cookie
}

function parseCookieString(cookieString: string) {
	const output: Record<string, string> = {}

	cookieString.split(';').forEach(part => {
		const [name, ...rest] = part.trim().split('=')
		if (!name) return
		output[name] = decodeURIComponent(rest.join('='))
	})

	return output
}

export const cookies = {
	set(name: string, value: string, options: CookieSetOptions = {}) {
		if (typeof document === 'undefined') return

		const cookie = serializeCookie(name, value, options)
		document.cookie = cookie
	},

	get(name: string): string | undefined {
		if (typeof document === 'undefined') return

		const parsed = parseCookieString(document.cookie)
		return parsed[name]
	},

	remove(name: string, options: CookieSetOptions = {}) {
		if (typeof document === 'undefined') return

		const cookie = serializeCookie(name, '', {
			...options,
			expires: new Date(0)
		})

		document.cookie = cookie
	},

	getAll(): Record<string, string> {
		if (typeof document === 'undefined') return {}

		return parseCookieString(document.cookie)
	}
}
