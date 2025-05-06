'use client'

import {
	ArrowLeft,
	CircleCheckBig,
	Library,
	PauseCircle,
	PlayCircle
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { CourseProgress } from '../shared/course-progress'
import { buttonVariants } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'

import { ROUTES } from '@/src/constants'
import type { CourseResponse, LessonResponse } from '@/src/generated'
import { cn } from '@/src/lib/utils'

interface LessonSidebarProps {
	course: CourseResponse
	lessons: LessonResponse[]
	completedLessons: string[]
	progressCount: number
}

export function LessonSidebar({
	course,
	lessons,
	completedLessons,
	progressCount
}: LessonSidebarProps) {
	const pathname = usePathname()

	return (
		<aside className='fixed inset-y-0 left-0 z-40 hidden bg-background pb-20 md:z-50 md:block md:w-80 md:border-r'>
			<div className='flex h-full flex-col'>
				<div className='flex flex-col gap-y-4 border-b p-5'>
					<div className='flex items-center justify-between'>
						<Link
							href={ROUTES.courses}
							className='flex items-center gap-x-2 text-sm hover:text-blue-600 hover:transition-colors'
						>
							<ArrowLeft className='size-4' />
							<div className='flex items-center gap-x-2'>
								<Library className='size-4' />
								Все курсы
							</div>
						</Link>
					</div>

					<div className='space-y-4'>
						<h1 className='text-xl font-semibold'>
							{course.title}
						</h1>
						<CourseProgress
							progress={progressCount}
							variant='success'
							isShowPercentage
							label='Прогресс'
						/>
					</div>
				</div>

				<ScrollArea className='flex-1'>
					<div className='group flex flex-col gap-2 px-2 py-4'>
						<nav className='flex flex-col gap-3 px-2'>
							{lessons.map((lesson, index) => {
								const isCompleted = completedLessons.includes(
									lesson.id
								)
								const isActive =
									pathname === ROUTES.lesson(lesson.slug)

								const Icon = isActive
									? PauseCircle
									: isCompleted
										? CircleCheckBig
										: PlayCircle

								return (
									<Link
										key={index}
										href={ROUTES.lesson(lesson.slug)}
										className={cn(
											buttonVariants({
												variant: 'ghost',
												size: 'lg'
											}),
											'hover:bg-muted',
											isActive && 'h-10 bg-muted',
											'h-10 justify-start'
										)}
									>
										<Icon
											size={22}
											className={cn(
												isCompleted &&
													'text-emerald-600'
											)}
										/>
										<span
											className={cn(
												isCompleted &&
													'text-emerald-600'
											)}
										>
											{lesson.title}
										</span>
									</Link>
								)
							})}
						</nav>
					</div>
				</ScrollArea>
			</div>
		</aside>
	)
}
