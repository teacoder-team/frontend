import { BookOpen } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import { mockUserData } from './mock'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/src/components/ui/card'

export function LearningProgress() {
	return (
		<Card>
			<CardHeader className='pb-2'>
				<CardTitle className='flex items-center text-lg font-medium'>
					<BookOpen className='mr-2 h-5 w-5 text-blue-500' />
					Прогресс обучения
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex items-center justify-between'>
					<div>
						<div className='text-3xl font-bold'>
							{mockUserData.completedLessons}/
							{mockUserData.totalLessons}
						</div>
						<div className='text-sm text-muted-foreground'>
							Пройдено уроков
						</div>
					</div>
					<div className='size-20'>
						<CircularProgressbar
							value={mockUserData.completionPercentage}
							text={`${mockUserData.completionPercentage}%`}
							styles={buildStyles({
								textSize: '1.5rem',
								pathColor: '#3b82f6',
								textColor: '#3b82f6'
							})}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
