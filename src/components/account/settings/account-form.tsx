import { Card, CardContent } from '../../ui/card'

import { EmailForm } from './email-form'
import { PasswordForm } from './password-form'
import { User } from '@/src/types/user'

interface AccountFormProps {
	user: User | undefined
}

export function AccountForm({ user }: AccountFormProps) {
	return (
		<div className='flex flex-col gap-y-3'>
			<h2 className='text-[19px] font-medium shadow-none'>Аккаунт</h2>
			<Card>
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
