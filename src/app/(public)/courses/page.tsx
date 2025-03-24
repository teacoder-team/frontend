import { BookOpen } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaYoutube } from 'react-icons/fa6'

import { getCourses } from '@/src/api'
import { CourseCard } from '@/src/components/course/course-card'
import { Badge } from '@/src/components/ui/badge'
import { getMediaSource } from '@/src/lib/utils'

export const metadata: Metadata = {
	title: 'Курсы',
	description:
		'Здесь собраны курсы по веб-разработке, которые помогут вам освоить самые востребованные технологии и инструменты.'
}

export default async function CoursesPage() {
	const courses = await getCourses()

	return (
		<main className='mx-auto my-20 max-w-7xl'>
			<div className='mx-auto w-full text-center'>
				<h1 className='text-center text-4xl font-semibold tracking-tight sm:text-5xl'>
					Курсы
				</h1>
				<p className='mx-auto mt-6 max-w-3xl text-center leading-7 text-muted-foreground sm:text-lg'>
					Здесь собраны курсы по веб-разработке, которые помогут вам
					освоить самые востребованные технологии и инструменты.
				</p>
			</div>
			<div className='my-20 grid gap-8 px-10 sm:grid-cols-2 md:grid-cols-2 md:px-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'>
				{courses.map((course, index) => (
					<CourseCard key={index} course={course} />
				))}
			</div>
		</main>
	)
}
