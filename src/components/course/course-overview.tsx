import { Fragment } from 'react'

import type { CourseResponse } from '@/src/generated'

interface CourseOverviewProps {
	course: CourseResponse
}

export function CourseOverview({ course }: CourseOverviewProps) {
	return (
		<Fragment>
			<div className='rounded-lg border bg-card p-6'>
				<h2 className='mb-4 text-2xl font-bold'>О курсе</h2>
				<p className='text-muted-foreground'>{course.description}</p>
			</div>
			{/* <div className='mt-6 rounded-lg border bg-card p-6'>
				<h2 className='mb-4 text-2xl font-bold'>What you'll learn</h2>
				<ul className='grid gap-3 sm:grid-cols-2'>
					<li className='flex items-start gap-2'>
						<CheckCircle className='mt-0.5 size-5 text-green-500' />
						<span>
							Build modern web applications with Next.js 14
						</span>
					</li>
					<li className='flex items-start gap-2'>
						<CheckCircle className='mt-0.5 size-5 text-green-500' />
						<span>Master React Server Components</span>
					</li>
					<li className='flex items-start gap-2'>
						<CheckCircle className='mt-0.5 size-5 text-green-500' />
						<span>Implement authentication and authorization</span>
					</li>
					<li className='flex items-start gap-2'>
						<CheckCircle className='mt-0.5 size-5 text-green-500' />
						<span>Deploy your application to production</span>
					</li>
				</ul>
			</div> */}
		</Fragment>
	)
}
