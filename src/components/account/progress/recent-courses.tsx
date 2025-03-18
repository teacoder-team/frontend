import { mockCourses } from './mock'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/src/components/ui/card'
import { Progress } from '@/src/components/ui/progress'

export function RecentCourses() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-lg font-medium'>
					Последние курсы
				</CardTitle>
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
							<Progress value={course.progress} className='h-2' />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
