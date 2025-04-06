import { useTheme } from 'next-themes'
import Turnstile, { type TurnstileProps } from 'react-turnstile'

interface CaptchaProps extends Omit<TurnstileProps, 'sitekey'> {
	onVerify: (token: string) => void
}

export function Captcha({ onVerify, ...props }: CaptchaProps) {
	const { resolvedTheme } = useTheme()

	return (
		<div className='w-full'>
			<Turnstile
				sitekey={process.env['TURNSTILE_SITE_KEY']}
				onVerify={onVerify}
				theme={
					resolvedTheme === 'system'
						? 'auto'
						: resolvedTheme === 'dark'
							? 'dark'
							: 'light'
				}
				{...props}
			/>
		</div>
	)
}
