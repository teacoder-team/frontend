import { CreditCardIcon } from 'lucide-react'
import { ComponentType, SVGProps } from 'react'
import { Control } from 'react-hook-form'

import { SbpIcon } from '../icons/sbp-icon'
import { YoomoneyIcon } from '../icons/yoomoney-icon'

import type { PaymentFormValues } from './premium'
import { InitPaymentRequestMethod } from '@/src/api/generated'
import { FormControl, FormField, FormItem } from '@/src/components/ui/form'
import { Label } from '@/src/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group'
import { cn } from '@/src/lib/utils'

interface PaymentMethod {
	id: InitPaymentRequestMethod
	name: string
	description: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
	textColor: string
	bgColor: string
	isAllowed?: boolean
}

const paymentMethods: PaymentMethod[] = [
	{
		id: InitPaymentRequestMethod.BANK_CARD,
		name: 'Банковская карта',
		description: 'Оплата кредитной или дебетовой карты',
		icon: CreditCardIcon,
		textColor: 'text-blue-600',
		bgColor: 'bg-blue-100',
		isAllowed: true
	},
	{
		id: InitPaymentRequestMethod.SBP,
		name: 'СБП',
		description: 'Оплата через Систему быстрых платежей',
		icon: SbpIcon,
		textColor: 'text-blue-600',
		bgColor: 'bg-blue-100',
		isAllowed: false
	},
	{
		id: InitPaymentRequestMethod.YOOMONEY,
		name: 'ЮMoney',
		description: 'Оплата через кошелек ЮMoney',
		icon: YoomoneyIcon,
		textColor: 'text-blue-600',
		bgColor: 'bg-blue-100',
		isAllowed: false
	}
	// {
	// 	id: 'CRYPTO',
	// 	name: 'Криптовалюта',
	// 	description: 'Оплата с помощью BTC, USDT, TON',
	// 	icon: BitcoinIcon,
	// 	textColor: 'text-blue-600',
	// 	bgColor: 'bg-blue-100'
	// }
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
											!method.isAllowed
												? 'cursor-not-allowed opacity-50'
												: isSelected
													? 'border-blue-500 bg-blue-50 dark:border-border dark:bg-neutral-800'
													: 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-background'
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
														? 'text-blue-900 dark:text-white'
														: 'text-foreground'
												)}
											>
												{method.name}
											</span>
											<span
												className={cn(
													'mt-0.5 text-sm font-normal',
													isSelected
														? 'text-blue-700 dark:text-neutral-300'
														: 'text-muted-foreground'
												)}
											>
												{method.description}
											</span>
										</div>
										<RadioGroupItem
											value={method.id}
											id={method.id}
											disabled={!method.isAllowed}
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
