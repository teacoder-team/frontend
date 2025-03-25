import { APP_CONFIG } from '../../constants/app'

export function getMediaSource(
	path: string,
	tag: 'users' | 'courses' | 'attachments'
) {
	if (!path) {
		return ''
	}

	if (path.startsWith('https://')) {
		return path
	}

	return `${APP_CONFIG.storageUrl}/${tag}/${path}`
}
