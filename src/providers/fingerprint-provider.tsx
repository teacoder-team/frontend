'use client'

import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { type ReactNode } from 'react'

interface FingerprintProviderProps {
	children: ReactNode
}

export function FingerprintProvider({ children }: FingerprintProviderProps) {
	return (
		<FpjsProvider
			loadOptions={{
				apiKey: process.env['NEXT_PUBLIC_FPJS_API_KEY']!,
				endpoint: process.env['NEXT_PUBLIC_FPJS_ENDPOINT'],
				scriptUrlPattern: `${process.env['NEXT_PUBLIC_FPJS_ENDPOINT']}/web/v<version>/<apiKey>/loader_v<loaderVersion>.js`
			}}
		>
			{children}
		</FpjsProvider>
	)
}
