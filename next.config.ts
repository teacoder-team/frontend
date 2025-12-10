import type { NextConfig } from 'next'

const config: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	output: 'standalone',
	trailingSlash: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		],
		dangerouslyAllowSVG: false
	},
	typedRoutes: false,
	experimental: {
		optimizePackageImports: ['tailwindcss'],
		serverActions: {
			bodySizeLimit: '2mb'
		},
		mdxRs: false
	},
	compress: true
}

export default config
