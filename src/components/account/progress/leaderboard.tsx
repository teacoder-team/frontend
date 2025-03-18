import { ChevronRight, Trophy, Users } from 'lucide-react'

import { mockLeaderboard } from './mock'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/src/components/ui/card'

interface LeaderboardProps {
	limit?: number
	showButton?: boolean
	onViewAll?: () => void
}

export function Leaderboard({
	limit,
	showButton,
	onViewAll
}: LeaderboardProps) {
	const usersToShow = limit
		? mockLeaderboard.slice(0, limit)
		: mockLeaderboard

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center text-lg font-medium'>
					<Users className='mr-2 h-5 w-5' /> Рейтинг пользователей
				</CardTitle>
				<CardDescription>
					Пользователи с наибольшим количеством очков
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{usersToShow.map(user => (
						<div
							key={user.id}
							className='flex items-center justify-between rounded-md p-2'
						>
							<div className='flex items-center'>
								<div className='w-8 text-center font-bold'>
									{user.position === 1 && (
										<Trophy className='mx-auto h-5 w-5 text-yellow-500' />
									)}
									{user.position === 2 && (
										<Trophy className='mx-auto h-5 w-5 text-gray-400' />
									)}
									{user.position === 3 && (
										<Trophy className='mx-auto h-5 w-5 text-amber-700' />
									)}
									{user.position > 3 && user.position}
								</div>
								<div className='ml-4 font-medium'>
									{user.username}
								</div>
							</div>
							<div className='font-semibold'>
								{user.points} очков
							</div>
						</div>
					))}
				</div>
			</CardContent>
			{showButton && (
				<CardFooter>
					<Button
						variant='outline'
						className='w-full'
						onClick={onViewAll}
					>
						Посмотреть полный рейтинг{' '}
						<ChevronRight className='ml-2 h-4 w-4' />
					</Button>
				</CardFooter>
			)}
		</Card>
	)
}
