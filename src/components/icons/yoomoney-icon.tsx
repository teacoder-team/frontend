import type { SVGProps } from 'react'

interface YoomoneyIconProps extends SVGProps<SVGSVGElement> {}

export function YoomoneyIcon({ ...props }: YoomoneyIconProps) {
	return (
		<svg
			width='2861'
			height='2031'
			viewBox='0 0 2861 2031'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M1844.91 0C1279.2 0 829.27 456.278 829.27 1015.42C829.27 1581.01 1285.65 2030.84 1844.91 2030.84C2404.12 2030.84 2860.55 1574.56 2860.55 1015.42C2860.55 456.278 2404.12 0 1844.91 0ZM1844.91 1388.18C1639.19 1388.18 1465.57 1214.64 1465.57 1008.97C1465.57 803.348 1639.19 629.813 1844.91 629.813C2050.58 629.813 2224.15 803.348 2224.15 1008.97C2217.7 1221.09 2050.58 1388.18 1844.86 1388.18H1844.91ZM822.821 289.191V1767.34H462.776L0 289.191H822.821Z'
				fill='currentColor'
			/>
		</svg>
	)
}
