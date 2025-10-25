import { BitcoinIcon, CreditCardIcon, GlobeIcon, StarIcon } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

import { SbpIcon } from '../components/icons'

type IconType = ComponentType<SVGProps<SVGSVGElement>>

export const PAYMENT_METHOD_ICONS: Record<string, IconType> = {
	BANK_CARD: CreditCardIcon,
	SBP: SbpIcon,
	CRYPTO: BitcoinIcon,
	INTERNATIONAL_CARD: GlobeIcon,
	TELEGRAM_STARS: StarIcon
}
