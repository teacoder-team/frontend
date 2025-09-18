'use client'

import type { ReactNode } from 'react'

import { EllipsisLoader } from '../shared/ellipsis-loader'

import { useFetchMfaStatus } from '@/src/api/hooks'
import { useCurrent } from '@/src/hooks'

export function AccountProvider({ children }: { children: ReactNode }) {
	const { isLoading } = useCurrent()

	const { isLoading: isLoadingStatus } = useFetchMfaStatus()

	if (isLoading || isLoadingStatus) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<EllipsisLoader />
			</div>
		)
	}

	return <>{children}</>
}
