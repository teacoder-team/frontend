import type { Metadata } from 'next'

import { ResetPasswordForm } from '@/src/components/auth/reset-password-form'

export const metadata: Metadata = {
	title: 'Сброс пароля'
}

export default function ResetPasswordPage() {
	return <ResetPasswordForm />
}
