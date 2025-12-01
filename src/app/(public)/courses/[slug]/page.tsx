import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCourse, getCourseLessons, getCourses } from '@/src/api/requests'
import { CourseDetails } from '@/src/components/course/course-details'
import { getMediaSource } from '@/src/lib/utils'
import { CourseProvider } from '@/src/providers/course-provider'

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
		description: course.shortDescription,
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
			description: course.shortDescription ?? '',
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
