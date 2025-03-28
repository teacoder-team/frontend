import { OTPInput, OTPInputContext } from 'input-otp'
import { Minus } from 'lucide-react'
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
	useContext
} from 'react'

import { cn } from '@/src/lib/utils'

const InputOTP = forwardRef<
	ComponentRef<typeof OTPInput>,
	ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
	<OTPInput
		ref={ref}
		containerClassName={cn(
			'flex items-center gap-2 has-[:disabled]:opacity-50',
			containerClassName
		)}
		className={cn('disabled:cursor-not-allowed', className)}
		{...props}
	/>
))
InputOTP.displayName = 'InputOTP'

const InputOTPGroup = forwardRef<
	ComponentRef<'div'>,
	ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex items-center gap-x-3', className)}
		{...props}
	/>
))
InputOTPGroup.displayName = 'InputOTPGroup'

const InputOTPSlot = forwardRef<
	ComponentRef<'div'>,
	ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
	const inputOTPContext = useContext(OTPInputContext)
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

	return (
		<div
			ref={ref}
			className={cn(
				'relative flex h-10 w-14 items-center justify-center rounded-md border border-input text-sm transition-all',
				isActive &&
					'z-10 border-blue-600 ring-2 ring-blue-200 ring-offset-background',
				className
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
					<div className='animate-caret-blink h-4 w-px bg-foreground duration-1000' />
				</div>
			)}
		</div>
	)
})
InputOTPSlot.displayName = 'InputOTPSlot'

const InputOTPSeparator = forwardRef<
	ComponentRef<'div'>,
	ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
	<div ref={ref} role='separator' {...props}>
		<Minus />
	</div>
))
InputOTPSeparator.displayName = 'InputOTPSeparator'

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
