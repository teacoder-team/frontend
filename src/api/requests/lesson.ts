import type { CreateLessonRequest, LessonResponse } from '../generated'
import { api, instance } from '../instance'

export const getLesson = async (slug: string) =>
	await api
		.get<LessonResponse>(`/lessons/${slug}`)
		.then(response => response.data)

export const getCompletedLessons = async (courseId: string) =>
	await instance
		.get<string[]>(`/lessons/${courseId}/progress`)
		.then(response => response.data)

export const createLesson = (data: CreateLessonRequest) =>
	instance.post('/lessons', data)
