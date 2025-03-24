import { Terminal } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../ui/button'

export function Hero() {
	return (
		<section className='mx-auto flex min-h-[calc(100vh-6.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-6 py-16 text-center sm:space-y-8 sm:py-20 md:py-28 lg:py-32'>
			<div className='space-y-4'>
				<h1 className='bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[80px]'>
					Изучай веб-разработку
					<br />с TeaCoder
				</h1>
				<p className='mx-auto max-w-[25rem] leading-normal text-muted-foreground sm:max-w-[30rem] sm:text-base md:max-w-[36rem] md:text-lg lg:max-w-[42rem] lg:text-xl'>
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
					<Link href='/courses'>
						<Terminal />
						Начать обучение
					</Link>
				</Button>
			</div>
		</section>
	)
}
