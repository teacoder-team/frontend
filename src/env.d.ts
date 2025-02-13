/// <reference types="node" />

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test'
		APP_PORT: string
		APP_URL: string
		API_URL: string
		STORAGE_URL: string
	}
}
