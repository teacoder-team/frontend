import type { CourseResponse } from '../generated'

import { api } from './instance'

export const getAllCourses = () => api.get<CourseResponse[]>('/courses')

export const getCourseBySlug = (slug: string) =>
	api.get<CourseResponse>(`/courses/${slug}`)
