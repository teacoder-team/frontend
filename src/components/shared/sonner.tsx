'use client'

import type { ComponentProps } from 'react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = ComponentProps<typeof Sonner>

export function Toaster({ ...props }: ToasterProps) {
	return (
		<Sonner
			theme='light'
			className='toaster group font-sans tracking-wide'
			toastOptions={{
				classNames: {
					toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg text-white ',
					actionButton:
						'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
					cancelButton:
						'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground'
				}
			}}
			{...props}
		/>
	)
}
