'use client'

import { useQuery } from '@tanstack/react-query'

import { CourseContent } from './course-content'
import { CourseSidebar } from './course-sidebar'
import type { CourseResponse, LessonResponse } from '@/src/api/generated'
import { getCompletedLessons } from '@/src/api/requests'
import { useAuth } from '@/src/hooks'

interface CourseDetailsProps {
	course: CourseResponse
	lessons: LessonResponse[]
}

export function CourseDetails({ course, lessons }: CourseDetailsProps) {
	const { isAuthorized } = useAuth()

	const { data: completedLessons, isLoading } = useQuery({
		queryKey: ['get completed lessons'],
		queryFn: () => getCompletedLessons(course.id),
		enabled: isAuthorized
	})

	if (isLoading) return <div>Загрузка...</div>

	return (
		<div className='mx-auto mt-4 max-w-screen-xl px-5 pb-10 md:px-0'>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-6'>
				<CourseContent
					course={course}
					lessons={lessons}
					completedLessons={completedLessons ?? []}
				/>
				<CourseSidebar
					course={course}
					lessons={lessons}
					completedLessons={completedLessons ?? []}
				/>
			</div>
		</div>
	)
}
