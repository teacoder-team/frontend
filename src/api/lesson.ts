import type { CreateLessonRequest, LessonResponse } from '../generated'

import { api, instance } from './instance'

export const getLesson = (slug: string) =>
	api.get<LessonResponse>(`/lessons/${slug}`)

export const createLesson = (data: CreateLessonRequest) =>
	instance.post('/lessons', data)
