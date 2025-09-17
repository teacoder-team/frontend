'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Fragment } from 'react'

import { Heading } from '../../shared/heading'

import { AccountActions } from './account-actions'
import { AccountForm } from './account-form'
import { Preferences } from './preferences'
import { ProfileForm } from './profile-form'
import { Subscription } from './subscription'
import { TwoStepAuthForm } from './two-step-auth-form'
import { fetchMfaStatus } from '@/src/api/requests'
import { useCurrent } from '@/src/hooks'

export function Settings() {
	const { user } = useCurrent()

	const { data: status } = useQuery({
		queryKey: ['mfa status'],
		queryFn: () => fetchMfaStatus()
	})

	return (
		<div className='w-full'>
			<div className='mx-auto flex h-full max-w-5xl flex-col gap-4'>
				<Fragment>
					<Heading
						title='Настройки аккаунта'
						description=' Управление настройками вашего аккаунта'
					/>
					<div className='mt-2 space-y-9'>
						<ProfileForm user={user} />
						<AccountForm user={user} />
						<TwoStepAuthForm status={status} />
						<Subscription user={user} />
						<Preferences />
						<AccountActions />
					</div>
				</Fragment>
			</div>
		</div>
	)
}
