import { CircleHelp } from 'lucide-react'
import {
	FaChrome,
	FaEdge,
	FaFirefoxBrowser,
	FaOpera,
	FaSafari,
	FaYandex
} from 'react-icons/fa'

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
