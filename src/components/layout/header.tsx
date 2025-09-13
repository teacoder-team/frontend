'use client'

import Link from 'next/link'

import { Logo } from '../shared/logo'
import { Button } from '../ui/button'

import { MobileNav } from './mobile-nav'
import { NavLinks } from './nav-links'
import { UserMenu } from './user-menu'
import { ROUTES } from '@/src/constants'
import { useAuth } from '@/src/hooks'

export function Header() {
	const { isAuthorized } = useAuth()

	return (
		<header className='mb-5 border border-b bg-transparent py-0.5'>
			<div className='mx-auto max-w-7xl'>
				<div className='flex h-16 w-full items-center justify-between'>
					<div className='flex items-center'>
						<Link
							href={ROUTES.home}
							className='mr-10 flex items-center gap-x-3 text-xl font-bold text-blue-500'
						>
							<Logo className='size-8' />
							TeaCoder
						</Link>{' '}
					</div>
					<div className='hidden flex-1 items-center justify-center md:flex'>
						<NavLinks />
					</div>
					<div className='flex items-center gap-4'>
						<div className='hidden items-center space-x-4 md:flex'>
							{isAuthorized ? (
								<UserMenu />
							) : (
								<div className='flex items-center gap-5'>
									<Button variant='outline' size='sm' asChild>
										<Link href={ROUTES.login()}>Войти</Link>
									</Button>
									<Button variant='primary' size='sm' asChild>
										<Link href={ROUTES.register}>
											Регистрация
										</Link>
									</Button>
								</div>
							)}
						</div>
						<div className='md:hidden'>
							<MobileNav />
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
