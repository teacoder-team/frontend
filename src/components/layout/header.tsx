'use client'

import Link from 'next/link'

import { Logo } from '../shared/logo'
import { Button } from '../ui/button'

import { MobileNav } from './mobile-nav'
import { NavLinks } from './nav-links'
import { UserMenu } from './user-menu'
import { useAuth } from '@/src/hooks'

export function Header() {
	const { isAuthorized } = useAuth()

	return (
		<header className='bg-transparent py-1'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 w-full items-center justify-between'>
					<Link
						href='/'
						className='mr-10 flex items-center gap-x-3 text-xl font-bold text-blue-600'
					>
						<Logo className='size-8' />
						TeaCoder
					</Link>
					<NavLinks />
					<div className='hidden items-center space-x-4 md:flex'>
						{isAuthorized ? (
							<UserMenu />
						) : (
							<div className='flex items-center gap-5'>
								<Button variant='outline' size='sm' asChild>
									<Link href='/auth/login'>Войти</Link>
								</Button>
								<Button variant='primary' size='sm' asChild>
									<Link href='/auth/register'>
										Регистрация
									</Link>
								</Button>
							</div>
						)}
					</div>
					<MobileNav />
				</div>
			</div>
		</header>
	)
}
