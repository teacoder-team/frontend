import type { CourseResponse, LessonResponse } from '../generated'

import { api, instance } from './instance'

export const getAllCourses = () => api.get<CourseResponse[]>('/courses')

export const getCourseBySlug = (slug: string) =>
	api.get<CourseResponse>(`/courses/${slug}`)

export const getCourseLessons = (id: string) =>
	instance.get<LessonResponse[]>(`/courses/${id}/lessons`)
