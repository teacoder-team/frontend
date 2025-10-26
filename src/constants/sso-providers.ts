import type { ComponentType } from 'react'
import { FaDiscord, FaGithub, FaGoogle } from 'react-icons/fa6'

export interface SsoProviderMeta {
	id: string
	name: string
	description: string
	icon: ComponentType<{ className?: string }>
	color: string
}

export const SSO_PROVIDERS: Record<string, SsoProviderMeta> = {
	google: {
		id: 'google',
		name: 'Google',
		icon: FaGoogle,
		description: 'Настройте вход через Google для быстрой авторизации',
		color: 'bg-red-500'
	},
	github: {
		id: 'github',
		name: 'GitHub',
		icon: FaGithub,
		description: 'Настройте вход через GitHub для удобной авторизации',
		color: 'bg-gray-800'
	},
	discord: {
		id: 'discord',
		name: 'Discord',
		icon: FaDiscord,
		description: 'Настройте вход через Discord для авторизации в 1 клик',
		color: 'bg-indigo-600'
	}
} as const
