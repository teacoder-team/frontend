import Link from 'next/link'

import { ROUTES } from '@/src/constants'

interface NavLink {
	title: string
	href: string
}

export const navLinks: NavLink[] = [
	{ title: 'Курсы', href: ROUTES.COURSES.ROOT },
	{ title: 'Об основателе', href: ROUTES.ABOUT },
	{ title: 'Подписка', href: ROUTES.PREMIUM }
]

export function NavLinks() {
	return (
		<nav className='hidden items-center space-x-7 text-sm font-medium md:flex'>
			{navLinks.map((link, index) => (
				<Link
					key={index}
					href={link.href}
					className='text-sm text-neutral-600 transition hover:text-foreground dark:text-neutral-300 dark:hover:text-white'
				>
					{link.title}
				</Link>
			))}
		</nav>
	)
}
