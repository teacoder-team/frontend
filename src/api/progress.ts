import type {
	CreateProgressRequest,
	CreateProgressResponse
} from '../generated'

import { instance } from './instance'

export const createProgress = (data: CreateProgressRequest) =>
	instance.put<CreateProgressResponse>('/progress', data)
