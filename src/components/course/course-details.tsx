'use client'

import { useQuery } from '@tanstack/react-query'

import { Skeleton } from '../ui/skeleton'

import { CourseContent } from './course-content'
import { CourseSidebar } from './course-sidebar'
import type { CourseResponse, LessonResponse } from '@/src/api/generated'
import { getCompletedLessons } from '@/src/api/requests'
import { useAuth, useCurrent } from '@/src/hooks'

interface CourseDetailsProps {
	course: CourseResponse
	lessons: LessonResponse[]
}

export function CourseDetails({ course, lessons }: CourseDetailsProps) {
	const { isAuthorized } = useAuth()

	const { isLoading: isUserLoading } = useCurrent()

	const { data: completedLessons, isLoading } = useQuery({
		queryKey: ['get completed lessons'],
		queryFn: () => getCompletedLessons(course.id),
		enabled: isAuthorized
	})

	if (isUserLoading || isLoading) {
		return (
			<div className='mx-auto mt-4 max-w-screen-xl animate-pulse px-5 pb-10 md:px-0'>
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-6'>
					<div className='order-1 col-span-1 space-y-6 lg:col-span-4'>
						<Skeleton className='h-[450px] rounded-xl' />{' '}
						<Skeleton className='h-8 w-3/4 rounded' />{' '}
						<Skeleton className='h-4 w-full rounded' />
						<Skeleton className='h-4 w-5/6 rounded' />
						<Skeleton className='my-5 h-[0.5px] bg-border' />
						<Skeleton className='h-6 w-1/4 rounded' />{' '}
						<Skeleton className='h-4 w-full rounded' />
						<Skeleton className='h-4 w-5/6 rounded' />
					</div>

					<div className='order-2 space-y-4 lg:col-span-2'>
						<Skeleton className='h-40 rounded-xl' />
						<Skeleton className='h-32 rounded-xl' />
					</div>
				</div>
			</div>
		)
	}

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
