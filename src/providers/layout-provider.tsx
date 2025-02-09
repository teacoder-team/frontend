'use client'

import { usePathname } from 'next/navigation'
import { Fragment, ReactNode } from 'react'

interface LayoutProviderProps {
	excludedPaths: string[]
	children: ReactNode
}

export function LayoutProvider({
	excludedPaths,
	children
}: LayoutProviderProps) {
	const pathname = usePathname()

	const shouldExcludeLayout = excludedPaths.some(path =>
		pathname.includes(path)
	)

	return shouldExcludeLayout ? (
		<Fragment>{children}</Fragment>
	) : (
		<Fragment>{children}</Fragment>
	)
}
