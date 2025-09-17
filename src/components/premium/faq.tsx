'use client'

import Link from 'next/link'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '../ui/accordion'

const faqs = [
	{
		question: 'Как можно оплатить подписку?',
		answer: 'Оплата возможна при помощи банковских карт РФ, кошелька YooMoney и СБП.'
	},
	{
		question: 'Можно ли оплатить подписку за пределами РФ?',
		answer: 'Пока оплатить подписку за пределами России нельзя.'
	},
	{
		question: 'Как и когда можно отменить подписку?',
		answer: (
			<>
				<p className='mb-2'>
					Отменить подписку можно в любое время в{' '}
					<Link
						href='/account/subscription'
						className='text-blue-600 hover:text-blue-600/90'
					>
						настройках аккаунта
					</Link>
					.
				</p>
				<p>
					После отмены доступ к премиум-функциям сохранится вплоть до
					конца уже оплаченного периода. Когда потребуется продлить
					подписку, мы пришлём письмо на вашу электронную почту с
					выставленным счётом. Если счет не будет оплачен вовремя,
					подписка автоматически прекратится.
				</p>
			</>
		)
	},
	{
		question: 'Что входит в подписку?',
		answer: 'Подписка предоставляет полный и неограниченный доступ ко всему исходному коду всех проектов, включая все обновления и новые релизы.'
	}
]

export function FAQSection() {
	return (
		<section className='mx-auto mt-20 max-w-3xl px-4'>
			<h2 className='mb-8 text-center text-3xl font-bold text-foreground'>
				Часто задаваемые вопросы
			</h2>

			<Accordion type='single' collapsible className='w-full space-y-4'>
				{faqs.map((faq, i) => (
					<AccordionItem key={i} value={`faq-${i}`}>
						<AccordionTrigger className='text-left text-lg font-medium'>
							{faq.question}
						</AccordionTrigger>
						<AccordionContent className='text-neutral-600 dark:text-neutral-300'>
							{faq.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	)
}
