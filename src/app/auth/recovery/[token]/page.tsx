import type { Metadata } from 'next'

import { NewPasswordForm } from '@/src/components/auth/new-password-form'

export const metadata: Metadata = {
	title: 'Новый пароль'
}

export default async function NewPasswordPage() {
	return <NewPasswordForm />
}
