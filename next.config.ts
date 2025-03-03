import type { NextConfig } from 'next'

const config: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	output: 'standalone',
	trailingSlash: false,
	skipTrailingSlashRedirect: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	},
	experimental: {
		optimizePackageImports: ['tailwindcss']
	},
	env: {
		APP_PORT: process.env['APP_PORT'],
		APP_URL: process.env['APP_URL'],
		COOKIE_DOMAIN: process.env['COOKIE_DOMAIN'],
		API_URL: process.env['API_URL'],
		STORAGE_URL: process.env['STORAGE_URL'],
		TURNSTILE_SITE_KEY: process.env['TURNSTILE_SITE_KEY'],
		YANDEX_METRIKA_ID: process.env['YANDEX_METRIKA_ID'],
		GOOGLE_ANALYTICS_ID: process.env['GOOGLE_ANALYTICS_ID']
	}
}

export default config
