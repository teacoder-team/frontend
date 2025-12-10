export const env = {
	NODE_ENV: process.env.NODE_ENV ?? 'production',

	APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'https://teacoder.ru',
	API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.teacoder.ru',
	STORAGE_URL:
		process.env.NEXT_PUBLIC_STORAGE_URL ?? 'https://orion.teacoder.ru',

	TURNSTILE_SITE_KEY:
		process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
		'0x4AAAAAAA8OCVg8s0LJ4Y18',
	FPJS_API_KEY:
		process.env.NEXT_PUBLIC_FPJS_API_KEY ?? '7wb2b5FhlpsSLPaAKf3Y',
	FPJS_ENDPOINT:
		process.env.NEXT_PUBLIC_FPJS_ENDPOINT ?? 'https://idp.teacoder.ru',
	YANDEX_METRIKA_ID: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? '97742461',
	GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '',
	POSTHOG_KEY:
		process.env.NEXT_PUBLIC_POSTHOG_KEY ??
		'phc_lxrMAfoAiz8C5xqzdZF8Qdh2AWZuHnn3aP3T0xW6rVg',
	POSTHOG_HOST:
		process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com'
} as const
