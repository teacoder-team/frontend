import { AreaChart, BookOpen, Code } from 'lucide-react'

export const Features = () => {
	const features = [
		{
			icon: <BookOpen className='size-6 text-blue-600' />,
			title: 'Разнообразие курсов',
			description:
				'На платформе есть курсы по программированию и другим темам. Все уроки доступны в любое время, так что ты можешь учиться в удобном ритме.'
		},
		{
			icon: <AreaChart className='size-6 text-blue-600' />,
			title: 'Отслеживание прогресса',
			description:
				'Следи за своими достижениями, выполняй задания и зарабатывай очки. Вся статистика сохраняется в профиле, чтобы ты видел свой рост.'
		},
		{
			icon: <Code className='size-6 text-blue-600' />,
			title: 'Практика с кодом',
			description:
				'Все курсы включают видеоуроки и реальные примеры кода. Ты сможешь не только изучать теорию, но и сразу применять её на практике.'
		}
	]

	return (
		<section className='bg-neutral-100 py-16 dark:bg-neutral-900 md:py-24'>
			<div className='mx-auto max-w-7xl px-4 antialiased'>
				<div className='mx-auto w-full'>
					<h2 className='mb-4 text-center text-3xl font-semibold text-foreground md:mb-6 md:text-4xl lg:text-5xl'>
						Что тебя ждёт на платформе?
					</h2>
					<p className='mx-auto mb-6 max-w-2xl text-center text-base text-muted-foreground md:mb-8 md:text-lg'>
						Получи доступ к удобным курсам по программированию,
						отслеживай свой прогресс и практикуйся с реальными
						примерами кода
					</p>
				</div>
				<div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3'>
					{features.map((reason, index) => (
						<div
							key={index}
							className='rounded-lg border border-none text-card-foreground shadow-none'
						>
							<div className='space-y-4 p-6'>
								<div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/10'>
									{reason.icon}
								</div>
								<h3 className='text-xl font-semibold'>
									{reason.title}
								</h3>
								<p className='text-base text-muted-foreground'>
									{reason.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
