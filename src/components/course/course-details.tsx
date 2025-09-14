'use client'

import { useQuery } from '@tanstack/react-query'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { FaYoutube } from 'react-icons/fa'
import { FaFolder } from 'react-icons/fa6'
import { toast } from 'sonner'

import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

import { CourseInfo } from './course-info'
import { CourseLessons } from './course-lessons'
import { CourseOverview } from './course-overview'
import { CourseProgress } from './course-progress'
import { CourseSummary } from './course-summary'
import type { CourseResponse, LessonResponse } from '@/src/api/generated'
import { getCompletedLessons } from '@/src/api/requests'
import { ROUTES } from '@/src/constants'
import { useAuth } from '@/src/hooks'
import { getMediaSource, lessonsTranslator } from '@/src/lib/utils'

interface CourseDetailsProps {
	course: CourseResponse
	lessons: LessonResponse[]
}

export function CourseDetails({ course, lessons }: CourseDetailsProps) {
	// const [activeTab, setActiveTab] = useState('overview')
	// const lessonsRef = useRef<HTMLDivElement | null>(null)

	const { isAuthorized } = useAuth()

	const { data: completedLessons, isLoading } = useQuery({
		queryKey: ['get completed lessons'],
		queryFn: () => getCompletedLessons(course.id),
		enabled: isAuthorized
	})

	// function onStartCourse() {
	// 	setActiveTab('lessons')
	// 	if (lessonsRef.current) {
	// 		lessonsRef.current.scrollIntoView({ behavior: 'smooth' })
	// 	}
	// }

	if (isLoading) return <div>Загрузка...</div>

	return (
		// <main className='mx-auto mb-20 mt-10 max-w-7xl px-4 sm:px-6 lg:px-8'>
		// 	<CourseSummary
		// 		course={course}
		// 		lessons={lessons}
		// 		setActiveTab={setActiveTab}
		// 	/>
		// 	{isAuthorized && lessons.length > 0 && (
		// 		<CourseProgress
		// 			totalLessons={lessons.length}
		// 			completedLessons={completedLessons?.length ?? 0}
		// 		/>
		// 	)}

		// 	<div className='grid gap-8 lg:grid-cols-3'>
		// 		<div className='lg:col-span-2'>
		// 			{lessons.length ? (
		// 				<Tabs
		// 					value={activeTab}
		// 					onValueChange={setActiveTab}
		// 					className='w-full'
		// 				>
		// 					<TabsList className='mb-6 grid w-full grid-cols-2'>
		// 						<TabsTrigger value='overview'>
		// 							Описание
		// 						</TabsTrigger>
		// 						<TabsTrigger value='lessons'>Уроки</TabsTrigger>
		// 					</TabsList>

		// 					<TabsContent value='overview'>
		// 						<CourseOverview course={course} />
		// 					</TabsContent>

		// 					<TabsContent value='lessons'>
		// 						<div ref={lessonsRef}>
		// 							<CourseLessons
		// 								lessons={lessons}
		// 								completedLessons={completedLessons!}
		// 							/>
		// 						</div>
		// 					</TabsContent>
		// 				</Tabs>
		// 			) : (
		// 				<CourseOverview course={course} />
		// 			)}
		// 		</div>
		// 		<div>
		// 			<CourseInfo
		// 				course={course}
		// 				lessons={lessons}
		// 				completedLessons={completedLessons!}
		// 			/>
		// 		</div>
		// 	</div>
		// </main>
		<div className='mx-auto mt-4 max-w-screen-xl pb-10'>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-6'>
				<div className='order-1 col-span-1 flex flex-col space-y-6 lg:col-span-4'>
					<div className='relative aspect-video overflow-hidden rounded-xl border bg-white'>
						<Image
							src={getMediaSource(course.thumbnail!, 'courses')}
							alt={course.title}
							fill
						/>
					</div>
					<div className='flex flex-col'>
						<h1 className='text-3xl font-semibold'>
							{course.title}
						</h1>
						<p className='mt-3 text-[17px] text-neutral-600 dark:text-neutral-300'>
							{course.shortDescription}
						</p>
					</div>
					<div className='my-5 h-[0.5px] bg-border' />
					<div className='flex flex-col'>
						<h1 className='text-3xl font-semibold'>О курсе</h1>
						<p className='mt-3 text-[17px] text-neutral-600 dark:text-neutral-300'>
							{course.fullDescription}
						</p>
					</div>
					{lessons.length > 0 && (
						<>
							<div className='my-5 h-[0.5px] bg-border' />
							<div className='flex flex-col'>
								<CourseLessons
									lessons={lessons}
									completedLessons={completedLessons ?? []}
								/>
							</div>
						</>
					)}
				</div>
				<div className='order-2 lg:col-span-2'>
					<div className='flex flex-col gap-4 lg:sticky lg:top-10'>
						<div className='relative flex flex-col gap-2 rounded-xl border border-blue-500 bg-blue-600 p-5'>
							{lessons.length === 0 ? (
								<>
									<h2 className='text-xl font-semibold text-white'>
										Курс скоро будет доступен!
									</h2>
									<p className='text-sm text-neutral-200'>
										В этом курсе пока нет уроков, но вы
										можете ознакомиться с материалами и
										примерами
									</p>
								</>
							) : completedLessons &&
							  completedLessons.length > 0 ? (
								(() => {
									const lastCompletedId =
										completedLessons[
											completedLessons.length - 1
										]
									const lastIndex = lessons.findIndex(
										lesson => lesson.id === lastCompletedId
									)
									const nextLesson =
										lessons[lastIndex + 1] || lessons[0]

									return (
										<>
											<h2 className='text-xl font-semibold text-white'>
												{lastIndex + 1 ===
												lessons.length
													? 'Вы завершили курс 🎉'
													: 'Продолжить обучение?'}
											</h2>
											<p className='text-sm text-neutral-200'>
												{lastIndex + 1 ===
												lessons.length
													? 'Поздравляем! Вы прошли все уроки курса.'
													: 'Вы начали проходить курс. Продолжайте, чтобы пройти все уроки и получить максимум.'}
											</p>
											<Button
												variant='secondary'
												className='mt-3 w-full'
												asChild
											>
												<Link
													href={ROUTES.lesson(
														nextLesson.slug
													)}
												>
													{lastIndex + 1 ===
													lessons.length
														? 'Смотреть курс'
														: 'Продолжить'}
												</Link>
											</Button>
										</>
									)
								})()
							) : (
								<>
									<h2 className='text-xl font-semibold text-white'>
										Готовы начать обучение?
									</h2>
									<p className='text-sm text-neutral-200'>
										Отслеживайте прогресс, проходите уроки в
										удобном темпе и получайте максимум от
										курса
									</p>
									<Button
										variant='secondary'
										className='mt-3 w-full'
										asChild
									>
										<Link
											href={ROUTES.lesson(
												lessons[0].slug
											)}
										>
											Начать просмотр
										</Link>
									</Button>
								</>
							)}
						</div>

						<div className='relative flex flex-col gap-3 rounded-xl border border-border bg-background p-5'>
							<h2 className='text-xl font-semibold text-foreground'>
								Дополнительно
							</h2>
							<p className='text-sm text-neutral-600 dark:text-neutral-300'>
								Скачайте готовый код или смотрите курс на
								YouTube
							</p>

							<div className='flex flex-col gap-4'>
								{course.attachment && (
									<Button
										variant='primary'
										className='w-full'
										asChild
									>
										<Link
											href={
												isAuthorized
													? getMediaSource(
															course.attachment,
															'attachments'
														)
													: ROUTES.login(
															ROUTES.course(
																course.slug
															)
														)
											}
											download={isAuthorized}
										>
											Скачать код
										</Link>
									</Button>
								)}

								{course.youtubeUrl && (
									<Button
										variant='outline'
										className='w-full'
										asChild
									>
										<Link
											href={course.youtubeUrl}
											target='_blank'
										>
											Смотреть на YouTube
										</Link>
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
