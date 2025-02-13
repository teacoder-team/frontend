import type { Course } from '../types'

import { api } from './api'

class CourseAPI {
	public async findAll() {
		const response = await api.get<Course[]>('/course/all')

		return response
	}

	public async findBySlug(slug: string) {
		const response = await api.get<Course>(`/course/${slug}`)

		return response
	}
}

export const courseAPI = new CourseAPI()
