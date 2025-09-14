import type { ActiveRestrictionResponse } from '../generated'
import { instance } from '../instance'

export const getActiveRestriction = async () =>
	await instance
		.get<ActiveRestrictionResponse>('/restriction')
		.then(response => response.data)
