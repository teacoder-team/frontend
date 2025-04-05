'use client'

import { BookOpen, Code, Eye } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { type Dispatch, Fragment, type SetStateAction, useEffect } from 'react'
import { FaYoutube } from 'react-icons/fa'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

import type { CourseResponse, LessonResponse } from '@/src/generated'
import { useAuth } from '@/src/hooks'
import { getMediaSource } from '@/src/lib/utils'

interface CourseSummaryProps {
	course: CourseResponse
	lessons: LessonResponse[]
	setActiveTab: Dispatch<SetStateAction<string>>
}

export function CourseSummary({
	course,
	lessons,
	setActiveTab
}: CourseSummaryProps) {
	const { resolvedTheme } = useTheme()

	const { isAuthorized } = useAuth()

	return (
		<div className='relative mb-8 overflow-hidden rounded-xl border bg-popover p-8'>
			{resolvedTheme === 'light' && (
				<Fragment>
					<div className='absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl' />
					<div className='absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl' />
				</Fragment>
			)}

			<div className='relative z-10 flex flex-col gap-8 lg:flex-row'>
				<div className='flex-1'>
					<div className='mb-4 flex items-center gap-2'>
						<Badge className='flex items-center gap-1'>
							<Eye className='size-3.5' /> {course.views}{' '}
							просмотров
						</Badge>
					</div>

					<h1 className='mb-4 text-3xl font-bold text-accent-foreground sm:text-4xl md:text-5xl'>
						{course.title}
					</h1>

					<p className='mb-6 text-base text-muted-foreground md:text-lg'>
						{course.description?.split('.').slice(0, 2).join('.') +
							'.'}
					</p>

					<div className='flex flex-wrap gap-4'>
						{lessons.length > 0 && (
							<Button
								onClick={() => setActiveTab('lessons')}
								variant='primary'
							>
								<BookOpen className='size-4' />
								Начать
							</Button>
						)}

						{course.youtubeUrl && (
							<Button
								asChild
								variant={
									lessons.length > 0 ? 'outline' : 'primary'
								}
							>
								<Link href={course.youtubeUrl} target='_blank'>
									<FaYoutube className='size-4' />
									Смотреть на YouTube
								</Link>
							</Button>
						)}

						{course.attachment && (
							<Button asChild variant='outline'>
								<Link
									href={
										isAuthorized
											? getMediaSource(
													course.attachment,
													'attachments'
												)
											: '/auth/login'
									}
									download={isAuthorized}
								>
									<Code className='size-4' />
									Исходный код
								</Link>
							</Button>
						)}
					</div>
				</div>

				{/* <div className='relative aspect-video overflow-hidden rounded-lg md:hidden'>
					<Image
						src={getMediaSource(course.thumbnail ?? '', 'courses')}
						alt={course.title}
						fill
						className='object-cover'
						priority
					/>
				</div> */}
			</div>
		</div>
	)
}
