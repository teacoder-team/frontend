import { Slot, Slottable } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'

import { cn } from '@/src/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap select-none rounded-lg transition-all will-change-transform active:hover:scale-[0.98] active:hover:transform text-sm font-medium ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				primary:
					'bg-blue-600 text-primary-foreground hover:bg-blue-600/90'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 px-4 py-2',
				xs: 'h-9 rounded-lg px-3 text-xs',
				lg: 'h-11 rounded-lg px-8',
				icon: 'h-10 w-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	isLoading?: boolean
	children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			children,
			isLoading = false,
			asChild = false,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, className }),
					'flex gap-2'
				)}
				ref={ref}
				disabled={isLoading ?? props.disabled}
				{...props}
			>
				{isLoading && <Loader2 className='size-5 animate-spin' />}
				<Slottable>{children}</Slottable>
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
