import { Terminal } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../ui/button'

import { ROUTES } from '@/src/constants'

export function Hero() {
	return (
		<section className='mx-auto flex min-h-[calc(100vh-6.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-6 py-16 text-center sm:space-y-8 sm:py-20 md:py-28 lg:py-32'>
			<div className='space-y-4'>
				<h1 className='bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl xl:text-7xl'>
					Изучай веб-разработку
					<br className='sm:hidden' /> с{' '}
					<br className='hidden sm:block' />
					TeaCoder
				</h1>
				<p className='mx-auto max-w-xs leading-relaxed text-muted-foreground sm:max-w-sm sm:text-base md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl'>
					Платформа для изучения веб-разработки с гибким подходом.
					Получи доступ к курсам, которые помогут развить навыки и
					разобраться в реальных примерах
				</p>
			</div>
			<div className='flex gap-4'>
				<Button
					variant='primary'
					size='lg'
					className='rounded-full'
					asChild
				>
					<Link href={ROUTES.courses}>
						<Terminal />
						Начать обучение
					</Link>
				</Button>
			</div>
		</section>
	)
}
