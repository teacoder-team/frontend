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
	const cookie = await cookies()

	const token = cookie.get('token')?.value

	const { data: progressCount } = await api.get<number>(
		`/progress/${courseId}`,
		{
			headers: {
				'X-Session-Token': token ?? ''
			}
		}
	)

	const { data: completedLessons } = await api.get<string[]>(
		`/lessons/${courseId}/progress`,
		{
			headers: {
				'X-Session-Token': token ?? ''
			}
		}
	)

	return { progressCount, completedLessons }
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params

	const lesson = await getLesson(slug).catch(error => {
		notFound()
	})

	return {
		title: lesson.title,
		description: lesson.description
	}
}

export default async function LessonPage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const lesson = await getLesson(slug).catch(error => {
		notFound()
	})

	const lessons = await getCourseLessons(lesson.course.id)

	const { progressCount, completedLessons } = await getUserProgress(
		lesson.course.id
	)

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
					<p className='mb-8 text-muted-foreground'>
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
