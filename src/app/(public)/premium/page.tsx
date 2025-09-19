import { Metadata } from 'next'
import { headers } from 'next/headers'

import { Premium } from '@/src/components/premium/premium'

export const metadata: Metadata = {
	title: 'Подписка'
}

export default async function PremiumPage() {
	const headersStore = await headers()

	const allHeaders = Object.fromEntries(headersStore.entries())
	console.log(allHeaders)

	return <Premium />
}
