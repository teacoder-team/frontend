import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { api } from '@/src/api/instance'
import { getCourseLessons, getLesson } from '@/src/api/requests'
import { LessonCompleteButton } from '@/src/components/lesson/lesson-complete-button'
import { LessonContainer } from '@/src/components/lesson/lesson-container'
import { LessonPlayer } from '@/src/components/lesson/lesson-player'
import { LessonSidebar } from '@/src/components/lesson/lesson-sidebar'

export const revalidate = 60

async function getUserProgress(courseId: string) {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value

	const [{ data: progressCount }, { data: completedLessons }] =
		await Promise.all([
			api.get<number>(`/progress/${courseId}`, {
				headers: {
					'X-Session-Token': token ?? ''
				}
			}),
			api.get<string[]>(`/lessons/${courseId}/progress`, {
				headers: {
					'X-Session-Token': token ?? ''
				}
			})
		])

	return { progressCount, completedLessons }
}

export async function generateMetadata({
	params
}: {
	params: { id: string }
}): Promise<Metadata> {
	const { id } = await params

	try {
		const lesson = await getLesson(id)

		if (!lesson)
			return {
				title: 'Урок не найден'
			}

		return {
			title: lesson.title,
			description: lesson.description ?? ''
		}
	} catch (error) {
		console.error('[generateMetadata] getLesson failed', {
			id,
			error
		})

		return {
			title: 'Урок'
		}
	}
}

export default async function LessonPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	const lesson = await getLesson(id).catch(error => {
		console.error('[LessonPage] getLesson failed', {
			id,
			error
		})
		return null
	})

	if (!lesson) notFound()

	const [lessons, { progressCount, completedLessons }] = await Promise.all([
		getCourseLessons(lesson.course.id),
		getUserProgress(lesson.course.id)
	])

	return (
		<div className='h-full'>
			<LessonSidebar
				course={lesson.course}
				lessons={lessons}
				completedLessons={completedLessons}
				progressCount={progressCount}
			/>
			<LessonContainer>
				<h1 className='mb-4 text-3xl font-bold'>{lesson.title}</h1>

				{lesson.description && (
					<p className='mb-8 text-neutral-600 dark:text-neutral-300'>
						{lesson.description}
					</p>
				)}

				<div className='space-y-8'>
					<LessonPlayer videoId={lesson.kinescopeId} />

					<div className='flex justify-end'>
						<LessonCompleteButton
							lesson={lesson}
							completedLessons={completedLessons}
						/>
					</div>
				</div>
			</LessonContainer>
		</div>
	)
}
