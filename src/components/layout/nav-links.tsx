import Link from 'next/link'

import { Button } from '../ui/button'

interface NavLink {
	title: string
	href: string
}

export const navLinks: NavLink[] = [
	{ title: 'Курсы', href: '/courses' },
	{ title: 'Об основателе', href: '/about' }
]

export function NavLinks() {
	return (
		<nav className='hidden flex-1 items-center gap-2 text-sm font-medium md:flex'>
			{navLinks.map((link, index) => (
				<Button key={index} variant='ghost' size='sm'>
					<Link href={link.href}>{link.title}</Link>
				</Button>
			))}
		</nav>
	)
}
