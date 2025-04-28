import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '@/src/constants'
import type { LessonResponse } from '@/src/generated'
import { useAuth } from '@/src/hooks'

interface CourseLessonsProps {
	lessons: LessonResponse[]
	completedLessons: string[]
}

export function CourseLessons({
	lessons = [],
	completedLessons = []
}: CourseLessonsProps) {
	const { isAuthorized } = useAuth()

	const totalLessons = lessons?.length ?? 0
	const completedCount = completedLessons?.length ?? 0

	return (
		<div className='rounded-lg border bg-card'>
			<div className='border-b p-4'>
				<h2 className='text-xl font-bold'>Уроки</h2>
				{isAuthorized && (
					<p className='text-sm text-muted-foreground'>
						{totalLessons} уроков • {completedCount} выполнено
					</p>
				)}
			</div>
			<ul className='divide-y'>
				{lessons.map(lesson => {
					const isCompleted = completedLessons.includes(lesson.id)

					return (
						<li key={lesson.id} className='group'>
							<Link
								href={
									isAuthorized
										? ROUTES.lesson(lesson.slug)
										: ROUTES.login
								}
								className='flex items-center justify-between p-4 transition-colors hover:bg-muted/50'
							>
								<div className='flex items-start gap-3'>
									<div className='mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border'>
										{isCompleted ? (
											<CheckCircle className='size-5 text-emerald-500' />
										) : (
											<span className='text-xs'>
												{lesson.position}
											</span>
										)}
									</div>

									<div>
										<h3 className='font-medium'>
											{lesson.title}
										</h3>
										{lesson.description && (
											<p className='mt-1 text-sm text-muted-foreground'>
												{lesson.description}
											</p>
										)}
									</div>
								</div>
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
