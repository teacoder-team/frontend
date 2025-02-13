import type { Metadata } from 'next'

import { Sessions } from '@/src/components/account/sessions'

export const metadata: Metadata = {
	title: 'Управление сессиями'
}

export default function SessionsPage() {
	return <Sessions />
}
