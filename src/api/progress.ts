import type {
	CreateProgressRequest,
	CreateProgressResponse
} from '../generated'

import { instance } from './instance'

export const createProgress = async (data: CreateProgressRequest) =>
	await instance
		.put<CreateProgressResponse>('/progress', data)
		.then(response => response.data)

export const getCourseProgress = async (courseId: string) =>
	await instance
		.get<number>(`/progress/${courseId}`)
		.then(response => response.data)
