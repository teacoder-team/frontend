import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { courseAPI } from '@/src/api/course'

async function fetchCourse(slug: string) {
	try {
		const course = await courseAPI.findBySlug(slug)

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
		description: course.description
	}
}

export default async function CoursePage({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug

	const { course } = await fetchCourse(slug)

	return <div>{JSON.stringify(course)}</div>
}
