import type { Metadata } from 'next'

import { VerifyEmail } from '@/src/components/auth/verify-email'

export const metadata: Metadata = {
	title: 'Верификация почты'
}

export default async function VerifyEmailPage() {
	return <VerifyEmail />
}
