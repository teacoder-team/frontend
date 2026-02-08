export const env = {
	NODE_ENV: process.env.NODE_ENV ?? 'production',

	APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'https://teacoder.ru',
	API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.teacoder.ru',
	STORAGE_URL:
		process.env.NEXT_PUBLIC_STORAGE_URL ?? 'https://orion.teacoder.ru',

	TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '',
	FPJS_API_KEY: process.env.NEXT_PUBLIC_FPJS_API_KEY ?? '',
	FPJS_ENDPOINT:
		process.env.NEXT_PUBLIC_FPJS_ENDPOINT ?? 'https://idp.teacoder.ru',
	YANDEX_METRIKA_ID: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? '97742461',
	GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '',
	POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
	POSTHOG_HOST:
		process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com'
} as const
