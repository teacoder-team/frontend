'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Fragment } from 'react'

import { Heading } from '../../shared/heading'

import { SessionItem } from './session-item'
import { sessionAPI } from '@/src/api/session'

export function Sessions() {
	const { data: session, isLoading: isLoadingSession } = useQuery({
		queryKey: ['current session'],
		queryFn: () => sessionAPI.current()
	})

	const { data: sessions, isLoading: isLoadingSessions } = useQuery({
		queryKey: ['all sessions'],
		queryFn: () => sessionAPI.all()
	})

	return (
		<div className='w-full'>
			<div className='mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-xl'>
				{isLoadingSession || isLoadingSessions || !session ? (
					<div className='flex h-[75vh] items-center justify-center'>
						<Loader2 className='size-10 animate-spin text-muted-foreground' />
					</div>
				) : (
					<Fragment>
						<Heading
							title='Управление сессиями'
							description='Здесь отображаются устройства, с которых выполнен вход в вашу учетную запись. Вы можете завершить любые сессии, кроме текущей, чтобы защитить свой аккаунт.'
						/>
						<div className='mt-2 space-y-9'>
							<div className='flex flex-col gap-y-3'>
								<h2 className='text-[19px] font-medium'>
									Текущее устройство
								</h2>
								<SessionItem
									session={session}
									isCurrentSession
								/>
							</div>
							<div className='flex flex-col gap-y-3'>
								<h2 className='text-[19px] font-medium'>
									Активные сессии
								</h2>
								{sessions?.length ? (
									sessions.map((session, key) => (
										<SessionItem
											key={key}
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
