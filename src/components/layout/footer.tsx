import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { FaTelegram, FaYoutube } from 'react-icons/fa6'
import { SiBoosty } from 'react-icons/si'

export function Footer() {
	return (
		<footer className='border-t'>
			<div className='relative mx-auto max-w-[1340px] px-4 py-8 lg:px-8'>
				<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5'>
					<div className='col-span-2 flex-1 space-y-4'>
						<h2 className='font-bold'>TeaCoder</h2>
						<p className='text-sm text-muted-foreground'>
							Образовательная платформа по веб-разработке
						</p>
					</div>
					<div className='space-y-4'>
						<h3 className='text-sm font-medium'>Общие ссылки</h3>
						<ul className='space-y-3 text-sm'>
							<li>
								<Link
									href='/courses'
									className='text-muted-foreground transition-colors hover:text-primary'
								>
									Курсы
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-muted-foreground transition-colors hover:text-primary'
								>
									Об основателе
								</Link>
							</li>
							<li>
								<Link
									href='https://docs.teacoder.com'
									className='inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary'
									target='_blank'
									referrerPolicy='no-referrer'
								>
									<ExternalLink className='size-4' />
									API документация
								</Link>
							</li>
						</ul>
					</div>
					<div className='space-y-4'>
						<h3 className='text-sm font-medium'>Информация</h3>
						<ul className='space-y-3 text-sm'>
							<li>
								<Link
									href='/docs/agreement'
									className='text-muted-foreground transition-colors hover:text-primary'
								>
									Пользовательское соглашение
								</Link>
							</li>
							<li>
								<Link
									href='/docs/privacy'
									className='text-muted-foreground transition-colors hover:text-primary'
								>
									Политика конфиденциальности
								</Link>
							</li>
						</ul>
					</div>
					<div className='space-y-4'>
						<h3 className='text-sm font-medium'>Соц. сети</h3>
						<div className='flex space-x-4'>
							<Link
								href='https://youtube.com/@TeaCoder52'
								className='text-muted-foreground transition-colors hover:text-primary'
								target='_blank'
								referrerPolicy='no-referrer'
							>
								<FaYoutube className='size-6' />
								<span className='sr-only'>YouTube</span>
							</Link>
							<Link
								href='https://t.me/TeaCoder_official'
								className='text-muted-foreground transition-colors hover:text-primary'
								target='_blank'
								referrerPolicy='no-referrer'
							>
								<FaTelegram className='size-6' />
								<span className='sr-only'>Telegram</span>
							</Link>
							<Link
								href='https://github.com/teacoder-team'
								className='text-muted-foreground transition-colors hover:text-primary'
								target='_blank'
								referrerPolicy='no-referrer'
							>
								<FaGithub className='size-6' />
								<span className='sr-only'>Github</span>
							</Link>
							<Link
								href='https://boosty.to/teacoder'
								className='text-muted-foreground transition-colors hover:text-primary'
								target='_blank'
								referrerPolicy='no-referrer'
							>
								<SiBoosty className='size-6' />
								<span className='sr-only'>Boosty</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='container border-t py-6'>
				<p className='text-center text-sm text-muted-foreground'>
					TeaCoder © {new Date().getFullYear()} Все права защищены.
				</p>
			</div>
		</footer>
	)
}
