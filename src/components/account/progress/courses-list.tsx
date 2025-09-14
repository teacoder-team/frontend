import { useQuery } from '@tanstack/react-query'
import { BookOpen, ChevronRight } from 'lucide-react'

import { CourseProgress } from '../../shared/course-progress'

import { getMeProgress } from '@/src/api/requests'
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
	const { data, isLoading } = useQuery({
		queryKey: ['get me progress'],
		queryFn: () => getMeProgress()
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center text-lg font-medium'>
					<BookOpen className='mr-2 size-5' /> Все курсы
				</CardTitle>
				<CardDescription>Ваш прогресс по курсам</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{data?.map(course => (
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
								variant='success'
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
					Подробнее
					<ChevronRight className='ml-2 size-4' />
				</Button>
			</CardFooter>
		</Card>
	)
}
