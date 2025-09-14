import type { CourseResponse, LessonResponse } from '../generated'
import { api, instance } from '../instance'

export const getCourses = async () =>
	await api.get<CourseResponse[]>('/courses').then(response => response.data)

export const getPopularCourses = async () =>
	await api
		.get<CourseResponse[]>('/courses/popular')
		.then(response => response.data)

export const getCourse = async (slug: string) =>
	await api
		.get<CourseResponse>(`/courses/${slug}`)
		.then(response => response.data)

export const getCourseLessons = async (id: string) =>
	await instance
		.get<LessonResponse[]>(`/courses/${id}/lessons`)
		.then(response => response.data)

export const incrementCourseViews = (id: string) =>
	api.patch(`/courses/${id}/views`)
