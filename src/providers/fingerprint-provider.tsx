'use client'

import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import { type ReactNode } from 'react'

import { env } from '../config/env'

interface FingerprintProviderProps {
	children: ReactNode
}

export function FingerprintProvider({ children }: FingerprintProviderProps) {
	return (
		<FpjsProvider
			loadOptions={{
				apiKey: env.FPJS_API_KEY,
				endpoint: env.FPJS_ENDPOINT,
				scriptUrlPattern: `${env.FPJS_ENDPOINT}/web/v<version>/<apiKey>/loader_v<loaderVersion>.js`
			}}
		>
			{children}
		</FpjsProvider>
	)
}
