import { BitcoinIcon, CreditCardIcon, GlobeIcon, StarIcon } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

import { SberbankIcon, SbpIcon, TBankIcon } from '../components/icons'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

export const PAYMENT_METHOD_ICONS: Record<string, IconType> = {
	BANK_CARD: CreditCardIcon,
	SBP: SbpIcon,
	T_PAY: TBankIcon,
	SBER_PAY: SberbankIcon,
	CRYPTO: BitcoinIcon,
	INTERNATIONAL_CARD: GlobeIcon,
	TELEGRAM_STARS: StarIcon
}
