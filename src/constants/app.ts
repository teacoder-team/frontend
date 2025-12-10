export const APP_CONFIG = {
	baseUrl: process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://teacoder.ru',
	apiUrl: process.env['NEXT_PUBLIC_API_URL'] ?? 'https://api.teacoder.ru',
	storageUrl:
		process.env['NEXT_PUBLIC_STORAGE_URL'] ?? 'https://orion.teacoder.ru'
} as const
