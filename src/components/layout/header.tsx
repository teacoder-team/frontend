'use client'

import Link from 'next/link'

import { Logo } from '../shared/logo'
import { Button } from '../ui/button'

import { NavLinks } from './nav-links'
import { ProfileMenu } from './profile-menu'
import { useAuth } from '@/src/hooks/use-auth'

export function Header() {
	const { isAuthorized } = useAuth()

	return (
		<header className='sticky inset-x-0 top-0 z-30 border-b border-border bg-white sm:bg-white/90 sm:backdrop-blur-lg'>
			<div className='relative mx-auto max-w-[1340px] px-4 lg:px-8'>
				<div className='flex items-center'>
					<div className='flex h-16 w-full items-center justify-between'>
						<Link
							href='/'
							className='flex items-center gap-x-3 text-2xl font-bold text-blue-600'
						>
							<Logo className='size-10' />
							TeaCoder
						</Link>

						<nav className='flex gap-x-4 sm:gap-x-8'>
							<NavLinks />
							{isAuthorized ? (
								<ProfileMenu />
							) : (
								<div className='hidden items-center gap-6 lg:flex'>
									<Link href='/auth/login'>
										<Button variant='outline'>Войти</Button>
									</Link>
									<Link href='/auth/register'>
										<Button variant='primary'>
											Регистрация
										</Button>
									</Link>
								</div>
							)}
						</nav>
					</div>
				</div>
			</div>
		</header>
	)
}
