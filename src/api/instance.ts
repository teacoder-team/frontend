import axios from 'axios'

import { APP_CONFIG } from '../constants/app'
import { cookies } from '../lib/cookie'

export const api = axios.create({
	baseURL: APP_CONFIG.apiUrl
})

export const instance = axios.create({
	baseURL: APP_CONFIG.apiUrl,
	headers: {
		'X-Session-Token': cookies.get('token') ?? ''
	}
})
