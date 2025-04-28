import type { Metadata } from 'next'

import { Connections } from '@/src/components/account/connections/connections'

export const metadata: Metadata = {
	title: 'Сторонние сервисы'
}

export default function ConnectionsPage() {
	return <Connections />
}
