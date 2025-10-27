export const APP_CONFIG = {
	baseUrl: process.env['NEXT_PUBLIC_APP_URL'] as string,
	apiUrl: process.env['NEXT_PUBLIC_API_URL'] as string,
	storageUrl: process.env['NEXT_PUBLIC_STORAGE_URL'] as string
} as const
