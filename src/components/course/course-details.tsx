'use client'

import { useQuery } from '@tanstack/react-query'
import { CheckCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

import { CourseInfo } from './course-info'
import { CourseLessons } from './course-lessons'
import { CourseOverview } from './course-overview'
import { CourseProgress } from './course-progress'
import { CourseSummary } from './course-summary'
import { getCompletedLessons } from '@/src/api'
import type { CourseResponse, LessonResponse } from '@/src/generated'
import { useAuth } from '@/src/hooks'

interface CourseDetailsProps {
	course: CourseResponse
	lessons: LessonResponse[]
}

export function CourseDetails({ course, lessons }: CourseDetailsProps) {
	const [activeTab, setActiveTab] = useState('overview')
	const lessonsRef = useRef<HTMLDivElement | null>(null)

	const { isAuthorized } = useAuth()

	const { data: completedLessons, isLoading } = useQuery({
		queryKey: ['get completed lessons'],
		queryFn: () => getCompletedLessons(course.id),
		enabled: isAuthorized
	})

	if (isLoading) return <div>Загрузка...</div>

	return (
		<main className='mx-auto mb-20 mt-10 max-w-7xl px-4 sm:px-6 lg:px-8'>
			<CourseSummary
				course={course}
				lessons={lessons}
				setActiveTab={setActiveTab}
			/>
			{isAuthorized && lessons.length > 0 && (
				<CourseProgress
					totalLessons={lessons.length}
					completedLessons={completedLessons?.length ?? 0}
				/>
			)}

			<div className='grid gap-8 lg:grid-cols-3'>
				<div className='lg:col-span-2'>
					{lessons.length ? (
						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className='w-full'
						>
							<TabsList className='mb-6 grid w-full grid-cols-2'>
								<TabsTrigger value='overview'>
									Описание
								</TabsTrigger>
								<TabsTrigger value='lessons'>Уроки</TabsTrigger>
							</TabsList>

							<TabsContent value='overview'>
								<CourseOverview course={course} />
							</TabsContent>

							<TabsContent value='lessons'>
								<CourseLessons
									lessons={lessons}
									completedLessons={completedLessons!}
								/>
							</TabsContent>
						</Tabs>
					) : (
						<CourseOverview course={course} />
					)}
				</div>
				<div>
					<CourseInfo
						course={course}
						lessons={lessons}
						completedLessons={completedLessons!}
					/>
				</div>
			</div>
		</main>
	)
}
