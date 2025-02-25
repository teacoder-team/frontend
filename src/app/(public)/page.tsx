import type { Metadata } from 'next'
import { Fragment } from 'react'

import { Hero } from '@/src/components/home/hero'

export const metadata: Metadata = {
	title: 'Образовательная платформа по веб разработке'
}

export default function HomePage() {
	return (
		<Fragment>
			<Hero />
		</Fragment>
	)
}
