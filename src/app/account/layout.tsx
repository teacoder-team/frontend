import type { ReactNode } from 'react'

import { Header } from '@/src/components/layout/header'
import { UserNavigation } from '@/src/components/layout/user-navigation'
import { AccountProvider } from '@/src/providers'

export default function AccountLayout({ children }: { children: ReactNode }) {
	return (
		<AccountProvider>
			<Header />
			<main className='flex w-full flex-col items-center'>
				<div className='mx-auto w-full max-w-7xl'>
					<div className='my-2 flex w-full flex-row flex-wrap gap-12 px-10 lg:flex-nowrap lg:px-0'>
						<div className='w-full lg:max-w-[19rem]'>
							<UserNavigation />
						</div>
						{children}
					</div>
				</div>
			</main>
		</AccountProvider>
	)
}
