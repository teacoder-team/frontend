import { GoogleAnalytics } from '@next/third-parties/google'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { YandexMetrika } from '../components/analitycs/yandex-metrika'
import { TanstackQueryProvider } from '../components/providers/tanstack-query-provider'
import { Toaster } from '../components/shared/sonner'
import { APP_CONFIG, SEO } from '../constants'

import '@/src/styles/globals.css'

export const metadata: Metadata = {
	title: {
		absolute: SEO.name,
		template: `%s - ${SEO.name}`
	},
	description: SEO.description,
	metadataBase: new URL(APP_CONFIG.baseUrl),
	applicationName: SEO.name,
	keywords: SEO.keywords,
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/touch-icons/192x192.png',
		other: {
			rel: 'touch-icons',
			url: '/touch-icons/192x192.png',
			sizes: '192x192',
			type: 'image/png'
		}
	},
	manifest: '/manifest.webmanifest',
	openGraph: {
		title: SEO.name,
		description: SEO.description,
		type: 'website',
		emails: ['support@teacoder.ru'],
		siteName: SEO.name,
		locale: 'ru_RU',
		images: [
			{
				url: new URL(APP_CONFIG.baseUrl + '/touch-icons/512x512.png'),
				width: 512,
				height: 512,
				alt: SEO.name
			}
		],
		url: APP_CONFIG.baseUrl
	},
	twitter: {
		card: 'summary_large_image',
		title: SEO.name,
		description: SEO.description,
		images: [
			{
				url: new URL(APP_CONFIG.baseUrl + '/touch-icons/512x512.png'),
				width: 512,
				height: 512,
				alt: SEO.name
			}
		]
	},
	formatDetection: SEO.formatDetection
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html className={GeistSans.variable} lang='ru' suppressHydrationWarning>
			<body className='min-h-screen font-sans antialiased'>
				<TanstackQueryProvider>
					{children}
					<Toaster
						toastOptions={{
							classNames: {
								error: 'bg-red-100 text-red-800',
								success: 'bg-emerald-100 text-emerald-800',
								warning: 'bg-yellow-100 text-yellow-800',
								info: 'bg-sky-100 text-sky-800'
							}
						}}
					/>

					{process.env['NODE_ENV'] === 'production' && (
						<>
							<YandexMetrika
								id={process.env['YANDEX_METRIKA_ID'] ?? ''}
							/>
							<GoogleAnalytics
								gaId={process.env['GOOGLE_ANALYTICS_ID'] ?? ''}
							/>
						</>
					)}
				</TanstackQueryProvider>
			</body>
		</html>
	)
}
