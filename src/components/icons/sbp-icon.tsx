import type { SVGProps } from 'react'

interface SbpIconProps extends SVGProps<SVGSVGElement> {}

export function SbpIcon({ ...props }: SbpIconProps) {
	return (
		<svg
			width='2319'
			height='2861'
			viewBox='0 0 2319 2861'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M0 623.03L346.413 1242.22V1619.91L0.405245 2237.88L0 623.03Z'
				fill='currentColor'
			/>
			<path
				d='M1330.08 1016.91L1654.68 817.964L2319 817.344L1330.08 1423.16V1016.91Z'
				fill='currentColor'
			/>
			<path
				d='M1328.25 619.38L1330.08 1439.17L982.861 1225.82V0.380859L1328.25 619.38Z'
				fill='currentColor'
			/>
			<path
				d='M2319 817.33L1654.66 817.95L1328.25 619.38L982.861 0.380859L2319 817.33Z'
				fill='currentColor'
			/>
			<path
				d='M1330.08 2241.31V1843.58L982.861 1634.28L983.052 2860.93L1330.08 2241.31Z'
				fill='currentColor'
			/>
			<path
				d='M1653.87 2044.18L346.389 1242.22L0 623.03L2317.59 2043.37L1653.87 2044.18Z'
				fill='currentColor'
			/>
			<path
				d='M983.08 2860.93L1330.06 2241.31L1653.86 2044.17L2317.57 2043.36L983.08 2860.93Z'
				fill='currentColor'
			/>
			<path
				d='M0.408691 2237.87L985.701 1634.29L654.45 1431.05L346.416 1619.89L0.408691 2237.87Z'
				fill='currentColor'
			/>
		</svg>
	)
}
