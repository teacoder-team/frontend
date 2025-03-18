import type { PatchUserRequest } from '../generated'

import { instance } from './instance'

export const changeAvatar = (file: FormData) => {
	console.log(file)
	return instance.patch('/users/@me/avatar', file, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export const patchUser = (data: PatchUserRequest) =>
	instance.patch('/users/@me', data)
