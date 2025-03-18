'use client'

import { motion } from 'framer-motion'

export function EllipsisLoader() {
	return (
		<div className='flex items-center justify-center gap-3'>
			{[...Array(3)].map((_, i) => (
				<motion.div
					key={i}
					className='size-3.5 rounded-full bg-blue-500'
					animate={{
						opacity: [0.5, 1, 0.5],
						scale: [1, 1.2, 1]
					}}
					transition={{
						duration: 1,
						repeat: Number.POSITIVE_INFINITY,
						delay: i * 0.2
					}}
				/>
			))}
		</div>
	)
}
