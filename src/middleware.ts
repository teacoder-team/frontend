import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
	const { cookies, url } = request

	const token = cookies.get('token')?.value

	const isAuthPage = url.includes('/auth')

	if (isAuthPage) {
		if (token) {
			return NextResponse.redirect(new URL('/account', url))
		}

		return NextResponse.next()
	}

	if (!token) {
		return NextResponse.redirect(new URL('/auth/login', url))
	}
}

export const config = {
	matcher: ['/auth/:path*', '/account/:path*']
}
