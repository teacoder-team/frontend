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
				apiKey: process.env.FPJS_API_KEY,
				endpoint: undefined
			}}
		>
			{children}
		</FpjsProvider>
	)
}
