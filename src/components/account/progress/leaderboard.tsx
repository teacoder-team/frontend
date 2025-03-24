import { useQuery } from '@tanstack/react-query'
import { ChevronRight, Trophy, Users } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'

import { getLeaders } from '@/src/api'
import { Button } from '@/src/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/src/components/ui/card'
import { getMediaSource } from '@/src/lib/utils'

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
	const { data, isLoading } = useQuery({
		queryKey: ['get leaders'],
		queryFn: () => getLeaders()
	})

	const users = limit ? data?.slice(0, limit) : data

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center text-lg font-medium'>
					<Users className='mr-2 size-5' /> Рейтинг пользователей
				</CardTitle>
				<CardDescription>
					Пользователи с наибольшим количеством очков
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{users?.map((user, index) => {
						const position = index + 1

						return (
							<div
								key={index}
								className='flex items-center justify-between rounded-md p-2'
							>
								<div className='flex items-center'>
									<div className='w-8 text-center text-[15px] font-semibold'>
										{position === 1 && (
											<Trophy className='mx-auto size-5 text-yellow-500' />
										)}
										{position === 2 && (
											<Trophy className='mx-auto size-5 text-gray-400' />
										)}
										{position === 3 && (
											<Trophy className='mx-auto size-5 text-amber-700' />
										)}
										{position > 3 && position}
									</div>
									<div className='ml-4 flex items-center gap-4'>
										<Avatar>
											<AvatarImage
												src={getMediaSource(
													user.avatar,
													'users'
												)}
												alt='Аватарка'
											/>
											<AvatarFallback>
												{user?.displayName.slice(0, 1)}
											</AvatarFallback>
										</Avatar>
										<p className='font-medium'>
											{user.displayName}
										</p>
									</div>
								</div>
								<div className='font-medium'>
									{user.points} очков
								</div>
							</div>
						)
					})}
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
						<ChevronRight className='ml-2 size-4' />
					</Button>
				</CardFooter>
			)}
		</Card>
	)
}
