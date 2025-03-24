import { CourseProgress as Progress } from '../shared/course-progress'

interface CourseProgressProps {
	totalLessons: number
	completedLessons: number
}

export function CourseProgress({
	totalLessons,
	completedLessons
}: CourseProgressProps) {
	const progressPercentage =
		totalLessons > 0
			? Math.round((completedLessons / totalLessons) * 100)
			: 0

	return (
		<div className='mb-8 rounded-lg border bg-card p-4'>
			<div className='mb-2 flex items-center justify-between'>
				<span className='text-sm font-medium'>Ваш прогресс</span>
				<span className='text-sm text-muted-foreground'>
					{completedLessons}/{totalLessons} уроков
				</span>
			</div>
			<Progress progress={progressPercentage} variant='success' />
		</div>
	)
}
