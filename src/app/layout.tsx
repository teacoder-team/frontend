import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import type { ReactNode } from 'react'

import { Toaster } from '../components/shared/sonner'
import { APP_CONFIG, SEO } from '../constants'
import { YandexMetrikaScript } from '../lib/analytics/script-providers'
import { cn } from '../lib/utils'
import {
	AnalyticsProvider,
	BanChecker,
	FingerprintProvider,
	TanstackQueryProvider,
	ThemeProvider
} from '../providers'

import '@/src/styles/globals.css'

const font = Geist({
	subsets: ['cyrillic', 'latin'],
	variable: '--font-ibm-plex-sans'
})

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
				url: new URL(APP_CONFIG.baseUrl + '/opengraph.png'),
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
				url: new URL(APP_CONFIG.baseUrl + '/opengraph.png'),
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
		<html lang='ru' suppressHydrationWarning>
			<body className={cn('flex h-full w-full flex-col', font.variable)}>
				<TanstackQueryProvider>
					<AnalyticsProvider>
						<FingerprintProvider>
							<ThemeProvider
								attribute='class'
								defaultTheme='light'
								enableSystem
								disableTransitionOnChange
							>
								{children}
								<Toaster
									toastOptions={{
										classNames: {
											error: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 border-0',
											success:
												'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-0',
											warning:
												'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200 border-0',
											info: 'bg-sky-100 text-sky-800 dark:bg-gray-800 dark:text-gray-200 border-0'
										}
									}}
								/>
								<BanChecker />

								{process.env['NODE_ENV'] === 'production' && (
									<>
										<YandexMetrikaScript />
									</>
								)}
							</ThemeProvider>
						</FingerprintProvider>
					</AnalyticsProvider>
				</TanstackQueryProvider>
			</body>
		</html>
	)
}
