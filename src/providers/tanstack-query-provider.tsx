'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

export function TanstackQueryProvider({ children }: { children: ReactNode }) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: true,
					staleTime: 0
				}
			}
		})
	)

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
