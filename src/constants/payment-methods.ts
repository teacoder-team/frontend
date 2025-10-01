import { BitcoinIcon, CreditCardIcon } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

import { SbpIcon, YoomoneyIcon } from '../components/icons'

import { InitPaymentRequestMethod } from '@/src/api/generated'

interface PaymentMethod {
	id: InitPaymentRequestMethod
	name: string
	description: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
	isAllowed?: boolean
}

export const PAYMENT_METHODS: PaymentMethod[] = [
	{
		id: InitPaymentRequestMethod.BANK_CARD,
		name: 'Банковская карта',
		description: 'Оплата кредитной или дебетовой картой',
		icon: CreditCardIcon,
		isAllowed: true
	},
	{
		id: InitPaymentRequestMethod.SBP,
		name: 'СБП',
		description: 'Оплата через Систему быстрых платежей',
		icon: SbpIcon,
		isAllowed: true
	},
	{
		id: InitPaymentRequestMethod.YOOMONEY,
		name: 'ЮMoney',
		description: 'Оплата через кошелек ЮMoney',
		icon: YoomoneyIcon,
		isAllowed: true
	},
	// {
	// 	id: InitPaymentRequestMethod.STARS,
	// 	name: 'Telegram Stars',
	// 	description: 'Оплата подписки через звёзды Telegram',
	// 	icon: StarIcon,
	// 	isAllowed: true
	// },
	{
		id: 'CRYPTO',
		name: 'Криптовалюта',
		description: 'Оплата с помощью BTC, USDT, TON',
		icon: BitcoinIcon,
		isAllowed: true
	}
]
