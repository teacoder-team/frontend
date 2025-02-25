import { BookOpen } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaYoutube } from 'react-icons/fa6'

import { getAllCourses } from '@/src/api'
import { Badge } from '@/src/components/ui/badge'
import { getMediaSource } from '@/src/lib/utils'

async function fetchCourses() {
	const courses = await getAllCourses()

	return { courses }
}

export const metadata: Metadata = {
	title: 'Курсы',
	description:
		'Здесь собраны курсы по веб-разработке, которые помогут вам освоить самые востребованные технологии и инструменты.'
}

export default async function CoursesPage() {
	const { courses } = await fetchCourses()

	return (
		<div className='mx-auto max-w-[1340px] px-4 lg:px-8'>
			<div className='mt-8 sm:mt-16'>
				<h1 className='mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl'>
					Все курсы
				</h1>
				<p className='mt-4 max-w-2xl leading-7 text-slate-600 sm:text-lg sm:leading-8'>
					Здесь собраны курсы по веб-разработке, которые помогут вам
					освоить самые востребованные технологии и инструменты.
				</p>
			</div>
			<div className='mb-32 mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'>
				{courses.length ? (
					courses.map((course, index) => (
						<Link
							key={index}
							href={`/courses/${course.slug}`}
							className='group relative rounded-lg'
						>
							<div className='relative aspect-video overflow-hidden rounded-md transition-all'>
								<Image
									src={getMediaSource(
										`/courses/${course.thumbnail}`
									)}
									alt={course.title}
									fill
								/>
							</div>
							<div className='px-0 py-3'>
								<h3 className='font-medium text-slate-900 transition group-hover:text-blue-500'>
									{course.title}
								</h3>
								<p
									className='mt-1 overflow-hidden text-sm text-muted-foreground'
									style={{
										display: '-webkit-box',

										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 2
									}}
								>
									{course.description}
								</p>
								<Badge
									variant={
										course.lessons > 0 ? 'default' : 'error'
									}
									className='mt-3'
								>
									{course.lessons > 0 ? (
										<>
											<BookOpen className='mr-0.5 size-3.5' />
											{course.lessons} уроков`
										</>
									) : (
										<>
											<FaYoutube className='mr-0.5 size-3.5' />
											Youtube
										</>
									)}
								</Badge>
							</div>
						</Link>
					))
				) : (
					<div>Нечего не найдено</div>
				)}
			</div>
		</div>
	)
}
