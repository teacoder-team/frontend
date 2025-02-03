/// <reference types="node" />

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test'
		APP_PORT: number
		APP_URL: string
		API_URL: string
	}
}
