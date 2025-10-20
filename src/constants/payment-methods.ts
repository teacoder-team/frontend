import { BitcoinIcon, CreditCardIcon, GlobeIcon, StarIcon } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

import { SbpIcon } from '../components/icons'

import { InitPaymentRequestMethod } from '@/src/api/generated'

interface PaymentMethod {
	id: InitPaymentRequestMethod
	name: string
	description: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
	isAvailable?: boolean
}

export const PAYMENT_METHODS: PaymentMethod[] = [
	{
		id: InitPaymentRequestMethod.BANK_CARD,
		name: 'Банковская карта',
		description: 'Оплата картой российских банков',
		icon: CreditCardIcon,
		isAvailable: true
	},
	{
		id: InitPaymentRequestMethod.SBP,
		name: 'СБП',
		description: 'Оплата через Систему быстрых платежей',
		icon: SbpIcon,
		isAvailable: true
	},
	// {
	// 	id: InitPaymentRequestMethod.YOOMONEY,
	// 	name: 'ЮMoney',
	// 	description: 'Оплата через кошелек ЮMoney',
	// 	icon: YoomoneyIcon,
	// 	isAvailable: true
	// },

	{
		id: InitPaymentRequestMethod.CRYPTO,
		name: 'Криптовалюта',
		description: 'Оплата с помощью BTC, USDT, TON',
		icon: BitcoinIcon,
		isAvailable: true
	},
	{
		id: InitPaymentRequestMethod.INTERNATIONAL_CARD,
		name: 'Международные карты',
		description: 'Оплата картой зарубежных банков',
		icon: GlobeIcon,
		isAvailable: false
	},
	{
		id: InitPaymentRequestMethod.STARS,
		name: 'Telegram Stars',
		description: 'Оплата подписки через звёзды Telegram',
		icon: StarIcon,
		isAvailable: false
	}
]
