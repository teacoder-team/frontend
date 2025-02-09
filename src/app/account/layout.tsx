import { Fragment, type ReactNode } from 'react'

import { Header } from '@/src/components/layout/header'
import { UserNavigation } from '@/src/components/layout/user-navigation'

export default function AccountLayout({ children }: { children: ReactNode }) {
	return (
		<Fragment>
			<Header />
			<main className='flex w-full flex-col items-center pt-6'>
				<div className='mx-auto w-full max-w-7xl'>
					<div className='my-2 flex w-full flex-row flex-wrap gap-12 px-10 md:flex-nowrap lg:px-0'>
						<div className='w-full md:max-w-[19rem]'>
							<UserNavigation />
						</div>
						{children}
					</div>
				</div>
			</main>
		</Fragment>
	)
}
