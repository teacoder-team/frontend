import type { Metadata } from 'next'
import { Fragment } from 'react'

import { getPopularCourses } from '@/src/api/requests'
import { Features } from '@/src/components/home/features'
import { Hero } from '@/src/components/home/hero'
import { Popular } from '@/src/components/home/popular'
import { TelegramCTA } from '@/src/components/home/telegram-cta'

export const metadata: Metadata = {
	title: 'Образовательная платформа по веб разработке'
}

export default async function HomePage() {
	const courses = await getPopularCourses()

	return (
		<Fragment>
			<Hero />
			<Features />
			<Popular courses={courses} />
			<TelegramCTA />
		</Fragment>
	)
}
