import type {
	LeaderResponse,
	MeProgressResponse,
	MeStatisticsResponse,
	PatchUserRequest
} from '../generated'

import { api, instance } from './instance'

export const getLeaders = async () =>
	await api
		.get<LeaderResponse[]>('/users/leaders')
		.then(response => response.data)

export const getMeStatistics = async () =>
	await instance
		.get<MeStatisticsResponse>('/users/@me/statistics')
		.then(response => response.data)

export const getMeProgress = async () =>
	await instance
		.get<MeProgressResponse[]>('/users/@me/progress')
		.then(response => response.data)

export const changeAvatar = async (formData: FormData) =>
	await instance
		.patch('/users/@me/avatar', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then(response => response.data)

export const patchUser = (data: PatchUserRequest) =>
	instance.patch('/users/@me', data)
