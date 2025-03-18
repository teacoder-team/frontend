import { CourseProgress } from '../../shared/course-progress'

import { mockCourses } from './mock'
import { Button } from '@/src/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/src/components/ui/card'
import { Separator } from '@/src/components/ui/separator'

export function CoursesTab() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-lg font-medium'>Все курсы</CardTitle>
				<CardDescription>Ваш прогресс по всем курсам</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-6'>
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
							<div className='flex items-center gap-4'>
								<CourseProgress
									progress={course.progress}
									variant={
										course.progress === 100
											? 'success'
											: 'default'
									}
									className='h-2 flex-1'
								/>
								<span className='text-sm font-medium'>
									{course.progress}%
								</span>
							</div>
							<div className='flex justify-between text-sm text-muted-foreground'>
								<span>
									Последний доступ:{' '}
									{new Date(
										course.lastAccessed
									).toLocaleDateString()}
								</span>
								<Button
									variant='link'
									size='sm'
									className='h-auto p-0'
								>
									Продолжить обучение
								</Button>
							</div>
							{course.id !==
								mockCourses[mockCourses.length - 1].id && (
								<Separator className='mt-4' />
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
