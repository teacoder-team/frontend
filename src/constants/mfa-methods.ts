import { KeyIcon, ShieldIcon, SmartphoneIcon } from 'lucide-react'
import type { ComponentType } from 'react'

export type MfaMethod = 'totp' | 'passkey' | 'recovery'

export interface MfaOption {
	id: MfaMethod
	name: string
	description: string
	icon: ComponentType<{ className?: string }>
}

export const MFA_OPTIONS: MfaOption[] = [
	{
		id: 'totp',
		name: 'Приложение-аутентификатор',
		description: 'Коды из приложения на телефоне',
		icon: SmartphoneIcon
	},
	{
		id: 'passkey',
		name: 'Passkey',
		description: 'Биометрия или ключ доступа',
		icon: KeyIcon
	},
	{
		id: 'recovery',
		name: 'Резервный код',
		description: 'Используйте одноразовые запасные коды',
		icon: ShieldIcon
	}
]
