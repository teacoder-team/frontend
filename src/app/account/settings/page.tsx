import type { Metadata } from 'next'

import { Settings } from '@/src/components/account/settings/settings'

export const metadata: Metadata = {
	title: 'Настройки аккаунта'
}

export default function SettingsPage() {
	return <Settings />
}
