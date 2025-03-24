import type { MetadataRoute } from 'next'

import { APP_CONFIG } from '../constants'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [
				'/*?',
				'/*.html',
				'/auth/recovery/*',
				'/account/*',
				'/lesson/*',
				'*?*=*',
				'*?*=*&*=*',
				'*?*=*=*'
			]
		},
		host: APP_CONFIG.baseUrl,
		sitemap: `${APP_CONFIG.baseUrl}/sitemap.xml`
	}
}
