import type { ReactNode } from 'react'

interface LessonContainerProps {
	children: ReactNode
}

export function LessonContainer({ children }: LessonContainerProps) {
	return (
		<main className='h-full pl-20 lg:pl-80 lg:pt-12'>
			<div className='flex h-full flex-col overflow-hidden'>
				<div className='flex-1 overflow-y-auto'>
					<div className='mx-auto max-w-5xl px-4 pb-20'>
						{children}
					</div>
				</div>
			</div>
		</main>
	)
}
