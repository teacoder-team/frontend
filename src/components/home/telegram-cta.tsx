import Link from 'next/link'
import { FaTelegram } from 'react-icons/fa6'

import { Button } from '../ui/button'

export function TelegramCTA() {
	return (
		<div className='mb-20 flex w-full flex-col items-center justify-center px-4 py-16 text-center text-black'>
			<h2 className='mb-6 text-center text-5xl font-semibold text-foreground'>
				Присоединяйся в Telegram
			</h2>

			<p className='mb-8 max-w-2xl text-lg text-muted-foreground'>
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
