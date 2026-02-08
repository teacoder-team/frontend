import { useTheme } from 'next-themes'
import Turnstile, { type TurnstileProps } from 'react-turnstile'

import { env } from '@/src/config/env'

interface CaptchaProps extends Omit<TurnstileProps, 'sitekey'> {
	onVerify: (token: string) => void
}

export function Captcha({ onVerify, ...props }: CaptchaProps) {
	const { resolvedTheme } = useTheme()

	return (
		<Turnstile
			sitekey={env.TURNSTILE_SITE_KEY}
			onVerify={onVerify}
			theme={
				resolvedTheme === 'system'
					? 'auto'
					: resolvedTheme === 'dark'
						? 'dark'
						: 'light'
			}
			size='flexible'
			style={{
				width: '100%'
			}}
			{...props}
		/>
	)
}
