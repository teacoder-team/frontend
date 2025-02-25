'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Fragment } from 'react'

import { Heading } from '../../shared/heading'

import { getSessions } from '@/src/api'
import { RemoveAllSessions } from './remove-all-sessions'
import { SessionItem } from './session-item'

export function Sessions() {
	const { data, isLoading } = useQuery({
		queryKey: ['get sessions'],
		queryFn: () => getSessions()
	})

	const currentSession = data?.[0]
	const otherSessions = data?.slice(1)

	return (
		<div className='w-full'>
			<div className='mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-xl'>
				{isLoading || !currentSession ? (
					<div className='flex h-[75vh] items-center justify-center'>
						<Loader2 className='size-10 animate-spin text-muted-foreground' />
					</div>
				) : (
					<Fragment>
						<div className='flex items-center justify-between'>
							<Heading
								title='Устройства'
								description='Здесь отображаются устройства, с которых выполнен вход в вашу учетную запись.'
							/>
							<RemoveAllSessions />
						</div>
						<div className='mt-2 space-y-9'>
							<div className='flex flex-col gap-y-3'>
								<h2 className='text-lg font-medium'>
									Текущее устройство
								</h2>
								<SessionItem
									session={currentSession}
									isCurrentSession
								/>
							</div>
							<div className='flex flex-col gap-y-3'>
								<h2 className='text-lg font-medium'>
									Другие устройства
								</h2>
								{otherSessions?.length ? (
									otherSessions.map((session, index) => (
										<SessionItem
											key={index}
											session={session}
										/>
									))
								) : (
									<div className='text-sm text-muted-foreground'>
										Активных сессий не найдено
									</div>
								)}
							</div>
						</div>
					</Fragment>
				)}
			</div>
		</div>
	)
}
