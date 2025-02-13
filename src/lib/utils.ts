import { type ClassValue, clsx } from 'clsx'
import { CircleHelp } from 'lucide-react'
import {
	FaChrome,
	FaEdge,
	FaFirefoxBrowser,
	FaOpera,
	FaSafari,
	FaYandex
} from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

import { APP_CONFIG } from '../constants/app'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

const browsers = [
	{ names: ['chrome'], icon: FaChrome },
	{ names: ['firefox'], icon: FaFirefoxBrowser },
	{ names: ['safari'], icon: FaSafari },
	{ names: ['edge', 'microsoft edge'], icon: FaEdge },
	{ names: ['opera'], icon: FaOpera },
	{ names: ['yandex', 'yandex browser'], icon: FaYandex }
]

export function getBrowserIcon(browser: string) {
	const browserName = browser.toLowerCase()

	const found = browsers.find(({ names }) =>
		names.some(name => browserName.includes(name))
	)

	return found ? found.icon : CircleHelp
}

export function formatDate(date: string | Date): string {
	const createdAt = new Date(date)
	const formattedDate = new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: 'long',
		hour: '2-digit',
		minute: '2-digit'
	}).format(createdAt)

	const [day, month, year, time] = formattedDate.split(' ')

	return `${day} ${month} в ${time}`
}

export function getMediaSource(path: string) {
	return APP_CONFIG.storageUrl + path
}
