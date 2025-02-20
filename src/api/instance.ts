import { APP_CONFIG } from '../constants/app'
import { API } from '../lib/client/api'
import { getSessionToken } from '../lib/cookies/session'

export const api = new API({
	baseUrl: APP_CONFIG.apiUrl
})

export const instance = new API({
	baseUrl: APP_CONFIG.apiUrl,
	headers: {
		'X-Session-Token': getSessionToken() ?? ''
	}
})
