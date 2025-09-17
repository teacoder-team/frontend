import { BitcoinIcon, CreditCardIcon, LucideIcon } from 'lucide-react'
import { Control } from 'react-hook-form'

import type { PaymentFormValues } from './premium'
import { FormControl, FormField, FormItem } from '@/src/components/ui/form'
import { Label } from '@/src/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group'
import { cn } from '@/src/lib/utils'

interface PaymentMethod {
	id: string
	name: string
	description: string
	icon: LucideIcon
	textColor: string
	bgColor: string
}

const paymentMethods: PaymentMethod[] = [
	{
		id: 'BANK_CARD',
		name: 'Банковская карта',
		description: 'Оплата кредитной или дебетовой карты',
		icon: CreditCardIcon,
		textColor: 'text-blue-600',
		bgColor: 'bg-blue-100'
	},
	{
		id: 'CRYPTO',
		name: 'Криптовалюта',
		description: 'Оплата с помощью BTC, USDT, TON',
		icon: BitcoinIcon,
		textColor: 'text-blue-600',
		bgColor: 'bg-blue-100'
	}
]

interface PaymentMethodsProps {
	control: Control<PaymentFormValues>
}

export function PaymentMethods({ control }: PaymentMethodsProps) {
	return (
		<FormField
			control={control}
			name='method'
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<RadioGroup
							value={field.value}
							onValueChange={field.onChange}
							className='flex flex-col gap-4'
						>
							{paymentMethods.map(method => {
								const isSelected = field.value === method.id

								return (
									<Label
										key={method.id}
										htmlFor={method.id}
										className={cn(
											'flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-all duration-200',
											isSelected
												? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
												: 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-neutral-800'
										)}
									>
										<div
											className={cn(
												'flex size-10 items-center justify-center rounded-lg',
												isSelected
													? 'bg-blue-500'
													: method.bgColor
											)}
										>
											<method.icon
												className={cn(
													'size-5',
													isSelected
														? 'text-white'
														: method.textColor
												)}
											/>
										</div>
										<div className='flex flex-1 flex-col'>
											<span
												className={cn(
													'font-medium',
													isSelected
														? 'text-blue-900'
														: 'text-foreground'
												)}
											>
												{method.name}
											</span>
											<span
												className={cn(
													'mt-0.5 text-sm font-normal',
													isSelected
														? 'text-blue-700'
														: 'text-muted-foreground'
												)}
											>
												{method.description}
											</span>
										</div>
										<RadioGroupItem
											value={method.id}
											id={method.id}
											className='sr-only'
										/>
									</Label>
								)
							})}
						</RadioGroup>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}
