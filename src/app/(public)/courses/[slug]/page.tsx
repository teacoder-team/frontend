import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { api, getCourse, getCourseLessons, getCourses } from '@/src/api'
import { CourseDetails } from '@/src/components/course/course-details'
import { CourseProvider } from '@/src/components/providers/course-provider'
import { getMediaSource } from '@/src/lib/utils'

export async function generateStaticParams() {
	const courses = await getCourses()

	const paths = courses.map(course => {
		return {
			params: { slug: course.slug }
		}
	})

	return paths
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params

	const course = await getCourse(slug).catch(error => {
		notFound()
	})

	return {
		title: course.title,
		description: course.description,
		openGraph: {
			images: [
				{
					url: getMediaSource(course.thumbnail ?? '', 'courses'),
					alt: course.title
				}
			]
		},
		twitter: {
			title: course.title,
			description: course.description ?? '',
			images: [
				{
					url: getMediaSource(course.thumbnail ?? '', 'courses'),
					alt: course.title
				}
			]
		}
	}
}

export default async function CoursePage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const course = await getCourse(slug).catch(error => {
		notFound()
	})

	const lessons = await getCourseLessons(course.id)

	return (
		<CourseProvider id={course.id}>
			<CourseDetails course={course} lessons={lessons} />
		</CourseProvider>
	)
}
