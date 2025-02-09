import { Fragment, type ReactNode } from 'react'

import { Footer } from '@/src/components/layout/footer'
import { Header } from '@/src/components/layout/header'

export default function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<Fragment>
			<Header />
			<main className='relative overflow-hidden bg-gradient-to-b from-background to-background/50'>
				{children}
			</main>
			<Footer />
		</Fragment>
	)
}
