import type { MetadataRoute } from 'next'

import { getCourses } from '../api'
import { APP_CONFIG } from '../constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const courses: MetadataRoute.Sitemap = (await getCourses()).map(course => ({
		url: `${APP_CONFIG.baseUrl}/${course.slug}`,
		lastModified: course.updatedAt,
		changeFrequency: 'monthly',
		priority: 0.9
	}))

	return [
		{
			url: APP_CONFIG.baseUrl,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		...courses
	]
}
