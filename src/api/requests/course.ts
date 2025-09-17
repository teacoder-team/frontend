import type {
	CourseResponse,
	CoursesResponse,
	LessonResponse
} from '../generated'
import { api, instance } from '../instance'

export const getCourses = async () =>
	await api.get<CoursesResponse[]>('/courses').then(response => response.data)

export const getPopularCourses = async () =>
	await api
		.get<CoursesResponse[]>('/courses/popular')
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

export const generateDownloadLink = async (id: string) =>
	await instance.post(`/courses/${id}/download-link`).then(res => res.data)

export const resolveDownloadToken = async (token: string) =>
	await instance
		.get(`/courses/download/${token}`, { responseType: 'blob' })
		.then(res => res.data)
