import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { JSX } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FaTelegram, FaYoutube } from 'react-icons/fa6'
import { SiBoosty } from 'react-icons/si'

interface NavLink {
	title: string
	href: string
	isExternal?: boolean
}

interface SocialLink {
	href: string
	icon: JSX.Element
	label: string
}

const generalLinks: NavLink[] = [
	{ title: 'Курсы', href: '/courses' },
	{ title: 'Об основателе', href: '/about' },
	{
		title: 'API документация',
		href: 'https://api.teacoder.ru/docs',
		isExternal: true
	}
]

const documentsLinks: NavLink[] = [
	{ title: 'Пользовательское соглашение', href: '/document/terms-of-use' },
	{ title: 'Политика конфиденциальности', href: '/document/privacy-policy' }
]

const socialLinks: SocialLink[] = [
	{
		href: 'https://youtube.com/@TeaCoder52',
		icon: <FaYoutube className='size-6' />,
		label: 'YouTube'
	},
	{
		href: 'https://t.me/TeaCoder_official',
		icon: <FaTelegram className='size-6' />,
		label: 'Telegram'
	},
	{
		href: 'https://github.com/teacoder-team',
		icon: <FaGithub className='size-6' />,
		label: 'GitHub'
	},
	{
		href: 'https://boosty.to/teacoder',
		icon: <SiBoosty className='size-6' />,
		label: 'Boosty'
	}
]

export function Footer() {
	return (
		<footer className='border-t'>
			<div className='relative mx-auto max-w-[1340px] px-4 py-8 lg:px-8'>
				<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5'>
					<div className='col-span-2 flex-1 space-y-4'>
						<h2 className='text-2xl font-bold'>TeaCoder</h2>
						<p className='text-sm text-muted-foreground'>
							Образовательная платформа по веб-разработке
						</p>
					</div>
					<div className='space-y-4'>
						<h3 className='text-sm font-medium'>Общие ссылки</h3>
						<ul className='space-y-3 text-sm'>
							{generalLinks.map((link, index) => (
								<FooterLink key={index} {...link} />
							))}
						</ul>
					</div>

					<div className='space-y-4'>
						<h3 className='text-sm font-medium'>Документы</h3>
						<ul className='space-y-3 text-sm'>
							{documentsLinks.map((link, index) => (
								<FooterLink key={index} {...link} />
							))}
						</ul>
					</div>

					<div className='space-y-4'>
						<h3 className='text-sm font-medium'>Соц. сети</h3>
						<div className='flex space-x-4'>
							{socialLinks.map((link, index) => (
								<SocialLink key={index} {...link} />
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='mx-auto max-w-full border-t py-6'>
				<p className='text-center text-sm text-muted-foreground'>
					TeaCoder © {new Date().getFullYear()} Все права защищены.
				</p>
			</div>
		</footer>
	)
}

const FooterLink = ({ title, href, isExternal }: NavLink) => (
	<li>
		<Link
			href={href}
			className='inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary'
			target={isExternal ? '_blank' : undefined}
			referrerPolicy={isExternal ? 'no-referrer' : undefined}
		>
			{isExternal && <ExternalLink className='size-4' />}
			{title}
		</Link>
	</li>
)

const SocialLink = ({ href, icon, label }: SocialLink) => (
	<Link
		href={href}
		className='text-muted-foreground transition-colors hover:text-primary'
		target='_blank'
		referrerPolicy='no-referrer'
	>
		{icon}
		<span className='sr-only'>{label}</span>
	</Link>
)
