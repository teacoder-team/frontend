import Link from 'next/link'
import { FaTelegram } from 'react-icons/fa6'

import { Button } from '../ui/button'

export function TelegramCTA() {
	return (
		<div className='my-12 flex w-full flex-col items-center justify-center px-4 py-10 text-center text-black md:my-16 md:px-8 md:py-16 lg:my-20'>
			<h2 className='mb-4 text-center text-3xl font-semibold text-foreground md:mb-6 md:text-4xl lg:text-5xl'>
				Присоединяйся в Telegram
			</h2>

			<p className='mb-6 max-w-2xl text-base text-muted-foreground md:mb-8 md:text-lg'>
				Подписывайся на наш канал! Получай последние новости, общайся с
				единомышленниками и будь в курсе самых актуальных событий.
			</p>

			<Button
				variant='primary'
				size='lg'
				className='rounded-full'
				asChild
			>
				<Link
					href='https://t.me/TeaCoder_official'
					target='_blank'
					rel='noopener noreferrer'
				>
					<FaTelegram />
					Присоединиться
				</Link>
			</Button>
		</div>
	)
}
