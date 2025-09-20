import { Metadata } from 'next'

import { Premium } from '@/src/components/premium/premium'

export const metadata: Metadata = {
	title: 'Подписка'
}

export default async function PremiumPage() {
	return <Premium />
}
