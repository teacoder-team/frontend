import type { Metadata } from 'next'

import { RegisterForm } from '@/src/components/auth/register-form'

export const metadata: Metadata = {
	title: 'Создать аккаунт'
}

export default function RegisterPage() {
	return <RegisterForm />
}
