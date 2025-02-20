import Image from 'next/image'

import { Button } from '../ui/button'

import { CourseResponse } from '@/src/generated'
import { getMediaSource } from '@/src/lib/utils'

interface CourseProps {
	course: CourseResponse
}

export function Course({ course }: CourseProps) {
	return (
		<div className='mx-auto mb-32 max-w-[1340px] px-4 lg:px-8'>
			<div className='mt-8 grid sm:mt-16 md:grid-cols-2'>
				<div>
					<h1 className='text-4xl font-bold'>{course.title}</h1>
					<div className='flex items-center space-x-4'>
						<Button
							variant='primary'
							size='lg'
							className='rounded-full'
						>
							Начать смотреть
						</Button>
					</div>
				</div>
				<div className='relative aspect-video'>
					<Image
						src={getMediaSource(`/courses/${course.thumbnail}`)}
						alt={course.title}
						fill
						className='rounded-xl'
					/>
				</div>
			</div>
		</div>
	)
}
