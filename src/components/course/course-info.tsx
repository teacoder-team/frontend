'use client'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

import type { CourseResponse, LessonResponse } from '@/src/api/generated'
import { useAuth } from '@/src/hooks'
import { getLessonLabel } from '@/src/lib/utils'

interface CourseInfoProps {
	course: CourseResponse
	lessons: LessonResponse[]
	completedLessons: string[]
}

export function CourseInfo({
	course,
	lessons,
	completedLessons
}: CourseInfoProps) {
	const { isAuthorized } = useAuth()

	const formattedDate = new Date(course.createdAt).toLocaleDateString(
		'ru-RU',
		{
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}
	)

	const progressPercentage =
		(lessons?.length ?? 0) > 0 && (completedLessons?.length ?? 0) >= 0
			? Math.round(
					((completedLessons?.length ?? 0) / (lessons?.length ?? 0)) *
						100
				)
			: 0

	return (
		<Card className='sticky top-10'>
			<CardHeader className='pb-4'>
				<CardTitle>Информация</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					<div>
						<h4 className='text-sm font-medium text-muted-foreground'>
							Добавлен
						</h4>
						<p className='text-[15px]'>{formattedDate}</p>
					</div>

					<div>
						<h4 className='text-sm font-medium text-muted-foreground'>
							Количество уроков
						</h4>
						{course.youtubeUrl &&
							(lessons?.length > 0 ? (
								<p className='text-[15px]'>
									{lessons.length}{' '}
									{getLessonLabel(lessons.length)}
								</p>
							) : (
								<p className='text-[15px]'>
									Доступно на YouTube
								</p>
							))}
					</div>

					{isAuthorized && lessons.length > 0 && (
						<div>
							<h4 className='text-sm font-medium text-muted-foreground'>
								Ваш прогресс
							</h4>
							<p className='text-[15px]'>
								{progressPercentage}% завершено
							</p>
						</div>
					)}
				</div>

				{/* <div className='mt-6'>
					<Button className='w-full gap-2'>
						<BookOpen className='size-4' />
						Continue Learning
					</Button>
				</div> */}
			</CardContent>
		</Card>
	)
}
