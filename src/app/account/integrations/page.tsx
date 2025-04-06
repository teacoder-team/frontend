import type { Metadata } from 'next'

import { Integrations } from '@/src/components/account/integrations/integrations'

export const metadata: Metadata = {
	title: 'Сторонние сервисы'
}

export default function IntegrationsPage() {
	return <Integrations />
}
