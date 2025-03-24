import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaYoutube } from 'react-icons/fa'

import { Badge } from '../ui/badge'

import type { CourseResponse } from '@/src/generated'
import { getMediaSource } from '@/src/lib/utils'

interface CourseCardProps {
	course: CourseResponse
}

export function CourseCard({ course }: CourseCardProps) {
	return (
		<Link
			href={`/courses/${course.slug}`}
			className='group relative rounded-lg'
		>
			<div className='relative aspect-video overflow-hidden rounded-md transition-all'>
				<Image
					src={getMediaSource(course.thumbnail ?? '', 'courses')}
					alt={course.title}
					fill
				/>
			</div>
			<div className='px-0 py-3'>
				<h3 className='text-base font-medium text-slate-900 transition group-hover:text-blue-500'>
					{course.title}
				</h3>
				<p
					className='mt-1 overflow-hidden text-sm text-muted-foreground'
					style={{
						display: '-webkit-box',

						WebkitBoxOrient: 'vertical',
						WebkitLineClamp: 2
					}}
				>
					{course.description}
				</p>
				<Badge
					variant={course.lessons > 0 ? 'default' : 'error'}
					className='mt-3'
				>
					{course.lessons > 0 ? (
						<>
							<BookOpen className='mr-0.5 size-3.5' />
							{course.lessons} уроков`
						</>
					) : (
						<>
							<FaYoutube className='mr-0.5 size-3.5' />
							Youtube
						</>
					)}
				</Badge>
			</div>
		</Link>
	)
}
