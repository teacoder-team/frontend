import Link from 'next/link'

const navLinks = [
	{ href: '/courses', label: 'Курсы' },
	{ href: '/about', label: 'Об основателе' }
]

export function NavLinks() {
	return (
		<nav className='flex flex-1 items-center space-x-6 text-sm font-medium'>
			{navLinks.map(({ href, label }) => (
				<Link
					key={href}
					href={href}
					className='transition-colors hover:text-primary'
				>
					{label}
				</Link>
			))}
		</nav>
	)
}
