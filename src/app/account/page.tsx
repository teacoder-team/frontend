import type { Metadata } from 'next'

import { SettingsForm } from '@/src/components/account/settings/settings-form'

export const metadata: Metadata = {
	title: 'Аккаунт'
}

export default function AccountPage() {
	return (
		<div className='w-full'>
			<div className='mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-xl'>
				<SettingsForm />
			</div>
		</div>
	)
}
