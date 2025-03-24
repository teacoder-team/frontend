import { Card, CardContent } from '../../ui/card'

import { EmailForm } from './email-form'
import { PasswordForm } from './password-form'
import type { AccountResponse } from '@/src/generated'

interface AccountFormProps {
	user: AccountResponse | undefined
}

export function AccountForm({ user }: AccountFormProps) {
	return (
		<div className='flex flex-col gap-y-3'>
			<h2 className='text-[19px] font-medium'>Аккаунт</h2>
			<Card className='shadow-none'>
				<CardContent className='p-4'>
					<div className='space-y-8'>
						<EmailForm user={user} />
						<PasswordForm />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
