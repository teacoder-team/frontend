import { CourseCard } from '../course/course-card'

import { CourseResponse } from '@/src/generated'

interface PopularProps {
	courses: CourseResponse[]
}

export function Popular({ courses }: PopularProps) {
	return (
		<div className='mx-auto max-w-7xl py-10 antialiased md:py-20'>
			<div className='mx-auto w-full text-center'>
				<h2 className='mb-6 text-5xl font-semibold text-foreground'>
					Популярные курсы
				</h2>
				<p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
					Cамые популярные курсы среди пользователей платформы
				</p>
			</div>
			<div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 px-10 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 md:px-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4'>
				{courses.map((course, index) => (
					<CourseCard key={index} course={course} />
				))}
			</div>
		</div>
	)
}
