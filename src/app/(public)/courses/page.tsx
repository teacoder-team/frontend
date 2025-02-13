import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { courseAPI } from '@/src/api/course'
import { Badge } from '@/src/components/ui/badge'
import { getMediaSource } from '@/src/lib/utils'

async function fetchCourses() {
	const courses = await courseAPI.findAll()

	return { courses }
}

export const metadata: Metadata = {
	title: 'Курсы'
}

export default async function CoursesPage() {
	const { courses } = await fetchCourses()

	return (
		<div className='mx-auto max-w-[1340px] px-4 lg:px-8'>
			<div className='mt-8 sm:mt-16'>
				<h1 className='mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl'>
					Все курсы
				</h1>
				<p className='mt-4 max-w-5xl leading-7 text-slate-600 sm:text-lg sm:leading-8'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					<br /> Eos perspiciatis vitae architecto totam hic.
				</p>
			</div>
			<div className='mb-32 mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'>
				{courses.length ? (
					courses.map((course, index) => (
						<Link
							key={index}
							href={`/courses/${course.slug}`}
							className='group flex h-full flex-col overflow-hidden rounded-lg border bg-transparent transition hover:shadow-sm'
						>
							<div className='relative aspect-video w-full overflow-hidden rounded-t-md border-b'>
								<Image
									src={getMediaSource(
										`/courses/${course.thumbnail}`
									)}
									alt={course.title}
									fill
								/>
							</div>
							<div className='mb-4 mt-2 px-3'>
								<h2 className='text-base font-medium'>
									{course.title}
								</h2>
								<p
									className='overflow-hidden text-sm text-muted-foreground'
									style={{
										display: '-webkit-box',

										WebkitBoxOrient: 'vertical',
										WebkitLineClamp: 2
									}}
								>
									{course.description}
								</p>
								<Badge className='mt-3'>20 глав</Badge>
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
