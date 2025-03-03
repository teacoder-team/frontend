import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

import { revokeSession } from '@/src/api'
import { SessionResponse } from '@/src/generated'
import { formatDate, getBrowserIcon } from '@/src/lib/utils'

interface SessionItemProps {
	session: SessionResponse
	isCurrentSession?: boolean
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
	const Icon = getBrowserIcon(session.browser)

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['revoke session'],
		mutationFn: () => revokeSession(session.id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get sessions'] })
		},
		onError(error) {
			if (error.message) {
				toast.error(error.message)
			} else {
				toast.error('Ошибка при удалении сессии')
			}
		}
	})

	return (
		<Card className='shadow-none'>
			<CardContent className='flex items-center justify-between p-4'>
				<div className='flex items-center gap-x-3'>
					<div className='rounded-full bg-blue-500 p-2.5'>
						<Icon className='size-5 text-white' />
					</div>
					<div>
						<h2 className='font-semibold'>
							{session.browser}, {session.os}
						</h2>
						<p className='text-sm text-muted-foreground'>
							{isCurrentSession && (
								<span className='mr-1 inline-flex items-center'>
									<span className='relative mr-2 flex size-2'>
										<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75'></span>
										<span className='relative inline-flex size-2 rounded-full bg-emerald-500'></span>
									</span>
									<span className='text-emerald-500'>
										Текущее устройство
									</span>
									<span className='ml-2 mr-1'>•</span>
								</span>
							)}
							{session.city}, {session.country}
							{!isCurrentSession && (
								<> • {formatDate(session.createdAt)}</>
							)}
						</p>
					</div>
				</div>
				{!isCurrentSession && (
					<div className='space-x-2'>
						<Button
							onClick={() => mutate()}
							variant='outline'
							size='sm'
							isLoading={isPending}
						>
							Выйти
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
