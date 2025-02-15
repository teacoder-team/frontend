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
		API_URL: process.env['API_URL'],
		STORAGE_URL: process.env['STORAGE_URL'],
		COOKIE_DOMAIN: process.env['COOKIE_DOMAIN']
	}
}

export default config
