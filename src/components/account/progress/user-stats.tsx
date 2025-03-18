import { BookOpen, Trophy } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import { mockUserData } from './mock'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/src/components/ui/card'

export function UserStats() {
	return (
		<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='flex items-center text-lg font-medium'>
						<Trophy className='mr-2 size-5 text-yellow-500' />
						Очки и рейтинг
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex items-center justify-between'>
						<div>
							<div className='text-3xl font-bold'>
								{mockUserData.points}
							</div>
							<div className='text-sm text-muted-foreground'>
								Всего очков
							</div>
						</div>
						<div className='h-20 w-20'>
							<CircularProgressbar
								value={mockUserData.rank}
								maxValue={100}
								text={`#${mockUserData.rank}`}
								styles={{
									trail: {
										color: '#E2E8F0'
									},
									path: {
										color: '#6366F1'
									},
									text: {
										fontSize: '1.5rem',
										color: '#6366F1',
										fontWeight: 600
									}
								}}
							/>
						</div>
					</div>
					<div className='mt-4 text-sm'>
						<span className='font-medium'>Ваш рейтинг:</span>{' '}
						{mockUserData.rank} из {mockUserData.totalUsers}{' '}
						пользователей
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='flex items-center text-lg font-medium'>
						<BookOpen className='mr-2 size-5 text-blue-500' />
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
								styles={{
									trail: {
										color: '#E2E8F0'
									},
									path: {
										color: '#3B82F6'
									},
									text: {
										fontSize: '1.5rem',
										color: '#3B82F6',
										fontWeight: 600
									}
								}}
							/>
						</div>
					</div>
					<div className='mt-4 text-sm'>
						<span className='font-medium'>Завершено курсов:</span>{' '}
						{mockUserData.completedCourses}
						<br />
						<span className='font-medium'>В процессе:</span>{' '}
						{mockUserData.inProgressCourses}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
