import Link from 'next/link'

const navLinks = [
	{ href: '/courses', label: 'Курсы' },
	{ href: '/about', label: 'О основателе' }
]

export function NavLinks() {
	return (
		<div className='hidden items-center gap-4 lg:flex'>
			{navLinks.map(({ href, label }) => (
				<Link
					key={href}
					href={href}
					className='cursor-pointer py-1 pl-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
				>
					{label}
				</Link>
			))}
		</div>
	)
}
