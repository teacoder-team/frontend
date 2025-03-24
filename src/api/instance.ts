import axios from 'axios'

import { APP_CONFIG } from '../constants/app'
import { getSessionToken } from '../lib/cookies/session'

export const api = axios.create({
	baseURL: APP_CONFIG.apiUrl
})

export const instance = axios.create({
	baseURL: APP_CONFIG.apiUrl,
	headers: {
		'X-Session-Token': getSessionToken() ?? ''
	}
})
