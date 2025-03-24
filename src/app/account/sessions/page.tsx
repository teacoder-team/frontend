import type { Metadata } from 'next'

import { Sessions } from '@/src/components/account/sessions/sessions'

export const metadata: Metadata = {
	title: 'Уcтройства'
}

export default function SessionsPage() {
	return <Sessions />
}
