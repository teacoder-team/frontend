import { Card, CardContent } from '../../ui/card'

import { AutoBillingForm } from './auto-billing-form'
import type { AccountResponse } from '@/src/api/generated'

interface SubscriptionProps {
	user: AccountResponse | undefined
}

export function Subscription({ user }: SubscriptionProps) {
	return (
		<div className='flex flex-col gap-y-3'>
			<h2 className='text-[19px] font-medium'>Подписка</h2>
			<Card className='shadow-none'>
				<CardContent className='p-4'>
					<div className='space-y-8'>
						<AutoBillingForm user={user} />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
