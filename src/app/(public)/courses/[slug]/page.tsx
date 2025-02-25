import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getAllCourses, getCourseBySlug } from '@/src/api'
import { Course } from '@/src/components/course'
import { getMediaSource } from '@/src/lib/utils'

export async function generateStaticParams() {
	const courses = await getAllCourses()

	const paths = courses.map(course => {
		return {
			params: { slug: course.slug }
		}
	})

	return paths
}

async function fetchCourse(slug: string) {
	try {
		const course = await getCourseBySlug(slug)

		return { course }
	} catch (error) {
		notFound()
	}
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const slug = (await params).slug

	const { course } = await fetchCourse(slug)

	return {
		title: course.title,
		description: course.description,
		openGraph: {
			images: [
				{
					url: getMediaSource(course.thumbnail ?? ''),
					alt: course.title
				}
			]
		},
		twitter: {
			title: course.title,
			description: course.description ?? '',
			images: [
				{
					url: getMediaSource(course.thumbnail ?? ''),
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
	const slug = (await params).slug

	const { course } = await fetchCourse(slug)

	return <Course course={course} />
}
