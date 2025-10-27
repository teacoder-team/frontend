/// <reference types="node" />

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test'
		APP_PORT: string
		APP_URL: string
		COOKIE_DOMAIN: string
		API_URL: string
		API_DOCS: string
		STORAGE_URL: string
		TURNSTILE_SITE_KEY: string
		FPJS_API_KEY: string
		YANDEX_METRIKA_ID: string
		GOOGLE_ANALYTICS_ID: string
	}
}
