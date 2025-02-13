import { Terminal } from 'lucide-react'

import { Button } from '../ui/button'

export function Hero() {
	return (
		<section className='container flex min-h-[calc(100vh-6.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32'>
			<div className='space-y-4'>
				<h1 className='bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[80px]'>
					Изучай веб-разработку
					<br />с TeaCoder
				</h1>
				<p className='mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Dignissimos pariatur, similique distinctio illo eos quia
					nostrum, veritatis ratione saepe numquam voluptate!
					Voluptates magnam velit ut.
				</p>
			</div>
			<div className='flex gap-4'>
				<Button variant='primary' size='lg' className='rounded-full'>
					<Terminal />
					Начать обучение
				</Button>
			</div>
		</section>
	)
}
