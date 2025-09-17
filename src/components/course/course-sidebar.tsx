import Link from 'next/link'

import { Button } from '../ui/button'

import { CourseActions } from './course-actions'
import type { CourseResponse, LessonResponse } from '@/src/api/generated'
import { ROUTES } from '@/src/constants'

interface CourseSidebarProps {
	course: CourseResponse
	lessons: LessonResponse[]
	completedLessons: string[]
}

export function CourseSidebar({
	course,
	lessons,
	completedLessons
}: CourseSidebarProps) {
	const lastCompletedId = completedLessons[completedLessons.length - 1]
	const lastIndex = lessons.findIndex(lesson => lesson.id === lastCompletedId)
	const nextLesson = lessons[lastIndex + 1] || lessons[0]

	return (
		<div className='order-2 lg:col-span-2'>
			<div className='flex flex-col gap-4 lg:sticky lg:top-10'>
				<div className='relative flex flex-col gap-2 rounded-xl border border-blue-500 bg-blue-600 p-5'>
					{lessons.length === 0 ? (
						<>
							<h2 className='text-xl font-semibold text-white'>
								Курс скоро будет доступен!
							</h2>
							<p className='text-sm text-neutral-200'>
								В этом курсе пока нет уроков, но вы можете
								ознакомиться с материалами и примерами
							</p>
						</>
					) : completedLessons.length > 0 ? (
						<>
							<h2 className='text-xl font-semibold text-white'>
								{lastIndex + 1 === lessons.length
									? 'Вы завершили курс 🎉'
									: 'Продолжить обучение?'}
							</h2>
							<p className='text-sm text-neutral-200'>
								{lastIndex + 1 === lessons.length
									? 'Поздравляем! Вы прошли все уроки курса.'
									: 'Вы начали проходить курс. Продолжайте, чтобы пройти все уроки и получить максимум.'}
							</p>
							<Button
								variant='secondary'
								className='mt-3 w-full'
								asChild
							>
								<Link href={ROUTES.lesson(nextLesson.slug)}>
									{lastIndex + 1 === lessons.length
										? 'Смотреть курс'
										: 'Продолжить'}
								</Link>
							</Button>
						</>
					) : (
						<>
							<h2 className='text-xl font-semibold text-white'>
								Готовы начать обучение?
							</h2>
							<p className='text-sm text-neutral-200'>
								Отслеживайте прогресс, проходите уроки в удобном
								темпе и получайте максимум от курса
							</p>
							<Button
								variant='secondary'
								className='mt-3 w-full'
								asChild
							>
								<Link href={ROUTES.lesson(lessons[0].slug)}>
									Начать просмотр
								</Link>
							</Button>
						</>
					)}
				</div>

				<CourseActions course={course} />
			</div>
		</div>
	)
}
