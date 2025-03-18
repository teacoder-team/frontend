import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Политика конфиденциальности'
}

export default function PrivacyPage() {
	return (
		<main className='mx-auto my-20 max-w-4xl sm:mt-28'>
			<div className='mx-auto max-w-7xl px-4 lg:px-8'>
				<section className='mx-auto'>
					<h1 className='text-center text-3xl font-extrabold text-foreground sm:text-5xl'>
						Политика конфиденциальности
					</h1>
					<div className='mt-6 space-y-4 leading-7 text-foreground sm:leading-8'></div>
				</section>
			</div>
		</main>
	)
}
