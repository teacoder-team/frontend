'use client'

import { useMutation } from '@tanstack/react-query'
import { type ReactNode, useEffect } from 'react'

import { incrementCourseViews } from '@/src/api'

interface CourseProviderProps {
	id: string
	children: ReactNode
}

export function CourseProvider({ id, children }: CourseProviderProps) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['increment course views', id],
		mutationFn: () => incrementCourseViews(id)
	})

	useEffect(() => {
		mutate()
	}, [mutate])

	return <>{children}</>
}
