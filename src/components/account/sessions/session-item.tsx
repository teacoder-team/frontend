import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

import { formatDate, getBrowserIcon } from '@/src/lib/utils'
import type { Session } from '@/src/types/session'

interface SessionItemProps {
	session: Session
	isCurrentSession?: boolean
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
	const Icon = getBrowserIcon(session.browser)

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
							{session.city}, {session.country} ꞏ{' '}
							{formatDate(session.createdAt)}
						</p>
					</div>
				</div>
				<div className='space-x-2'>
					<Button variant='primary'>Подробнее</Button>
				</div>
			</CardContent>
		</Card>
	)
}
