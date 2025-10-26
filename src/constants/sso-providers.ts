import type { IconType } from 'react-icons'
import { FaDiscord, FaGithub } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { RiTelegram2Fill } from 'react-icons/ri'

export interface SsoProviderMeta {
	id: string
	name: string
	description: string
	icon: IconType
	color?: string
}

export const SSO_PROVIDERS: Record<string, SsoProviderMeta> = {
	google: {
		id: 'google',
		name: 'Google',
		icon: FcGoogle,
		description: 'Настройте вход через Google для быстрой авторизации'
	},
	github: {
		id: 'github',
		name: 'GitHub',
		icon: FaGithub,
		description: 'Настройте вход через GitHub для удобной авторизации'
	},
	discord: {
		id: 'discord',
		name: 'Discord',
		icon: FaDiscord,
		description: 'Настройте вход через Discord для авторизации в 1 клик',
		color: '#5D6AF2'
	},
	telegram: {
		id: 'telegram',
		name: 'Telegram',
		icon: RiTelegram2Fill,
		description: 'Настройте вход через Telegram для быстрой авторизации',
		color: '#0088CC'
	}
} as const
