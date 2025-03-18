import { BookOpen, ChevronRight } from 'lucide-react'

import { CourseProgress } from '../../shared/course-progress'

import { mockCourses } from './mock'
import { Button } from '@/src/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/src/components/ui/card'

interface CoursesListProps {
	onViewAll: () => void
}

export function CoursesList({ onViewAll }: CoursesListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center text-lg font-medium'>
					<BookOpen className='mr-2 h-5 w-5' /> Курсы
				</CardTitle>
				<CardDescription>Ваш прогресс по курсам</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{mockCourses.map(course => (
						<div key={course.id} className='space-y-2'>
							<div className='flex items-center justify-between'>
								<div className='font-medium'>
									{course.title}
								</div>
								<div className='text-sm text-muted-foreground'>
									{course.completedLessons}/
									{course.totalLessons} уроков
								</div>
							</div>
							<CourseProgress
								progress={course.progress}
								variant={
									course.progress === 100
										? 'success'
										: 'default'
								}
								className='h-2'
							/>
						</div>
					))}
				</div>
			</CardContent>

			<CardFooter>
				<Button
					variant='outline'
					className='w-full'
					onClick={onViewAll}
				>
					Посмотреть все курсы{' '}
					<ChevronRight className='ml-2 h-4 w-4' />
				</Button>
			</CardFooter>
		</Card>
	)
}
