import type { SVGProps } from 'react'

interface TBankIconProps extends SVGProps<SVGSVGElement> {}

export function TBankIcon({ ...props }: TBankIconProps) {
	return (
		<svg
			width='50'
			height='46'
			viewBox='0 0 50 46'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			style={{ width: 14.5 }}
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M0 0V17.1913C2.35085 14.5367 6.62508 12.74 11.5121 12.74H16.823V32.7247C16.823 38.0416 15.3784 42.6954 13.235 45.2552H36.336C34.1971 42.6928 32.7558 38.0449 32.7558 32.7349V12.74H38.0669C42.9539 12.74 47.228 14.5367 49.579 17.1913V0H0Z'
				fill='currentColor'
			/>
		</svg>
	)
}
