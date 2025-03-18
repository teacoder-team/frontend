import type { Metadata } from 'next'

import { Progress } from '@/src/components/account/progress/progress'

export const metadata: Metadata = {
	title: 'Мой прогресс'
}

export default function ProgressPage() {
	return <Progress />
}
