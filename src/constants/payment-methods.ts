import { BitcoinIcon, CreditCardIcon } from 'lucide-react'
import { ComponentType, SVGProps } from 'react'

import { SbpIcon } from '../components/icons'

import { InitPaymentRequestMethod } from '@/src/api/generated'

interface PaymentMethod {
	id: InitPaymentRequestMethod
	name: string
	description: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
	textColor: string
	bgColor: string
	isAllowed?: boolean
}

export const paymentMethods: PaymentMethod[] = [
	{
		id: InitPaymentRequestMethod.BANK_CARD,
		name: 'Банковская карта',
		description: 'Оплата кредитной или дебетовой картой',
		icon: CreditCardIcon,
		textColor: 'text-blue-600',
		bgColor: 'bg-blue-100',
		isAllowed: true
	},
	{
		id: InitPaymentRequestMethod.SBP,
		name: 'СБП',
		description: 'Оплата через Систему быстрых платежей',
		icon: SbpIcon,
		textColor: 'text-blue-600',
		bgColor: 'bg-blue-100',
		isAllowed: true
	},
	// {
	// 	id: InitPaymentRequestMethod.YOOMONEY,
	// 	name: 'ЮMoney',
	// 	description: 'Оплата через кошелек ЮMoney',
	// 	icon: YoomoneyIcon,
	// 	textColor: 'text-blue-600',
	// 	bgColor: 'bg-blue-100',
	// 	isAllowed: false
	// },
	// {
	// 	id: InitPaymentRequestMethod.STARS,
	// 	name: 'Telegram Stars',
	// 	description: 'Оплата подписки через звёзды Telegram',
	// 	icon: StarIcon,
	// 	textColor: 'text-blue-600',
	// 	bgColor: 'bg-blue-100',
	// 	isAllowed: true
	// }
	{
		id: 'CRYPTO',
		name: 'Криптовалюта',
		description: 'Оплата с помощью BTC, USDT, TON',
		icon: BitcoinIcon,
		textColor: 'text-blue-600',
		bgColor: 'bg-blue-100',
		isAllowed: true
	}
]
