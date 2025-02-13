import { APP_CONFIG } from '../../constants/app'

export function getMediaSource(path: string) {
	return APP_CONFIG.storageUrl + path
}
