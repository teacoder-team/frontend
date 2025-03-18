'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type ReactNode } from 'react'

import { EllipsisLoader } from '../shared/ellipsis-loader'

import { fetchMfaStatus } from '@/src/api'
import { useCurrent } from '@/src/hooks'

export function AccountProvider({ children }: { children: ReactNode }) {
	const { isLoading } = useCurrent()

	const { isLoading: isLoadingStatus } = useQuery({
		queryKey: ['mfa status'],
		queryFn: () => fetchMfaStatus()
	})

	if (isLoading || isLoadingStatus) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<EllipsisLoader />
			</div>
		)
	}

	return <>{children}</>
}
