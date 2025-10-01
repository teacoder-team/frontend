import type { Control } from 'react-hook-form'

import type { PaymentFormValues } from './premium'
import { FormControl, FormField, FormItem } from '@/src/components/ui/form'
import { Label } from '@/src/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group'
import { PAYMENT_METHODS } from '@/src/constants'
import { cn } from '@/src/lib/utils'

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
							{PAYMENT_METHODS.map(method => {
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
													: 'bg-blue-100'
											)}
										>
											<method.icon
												className={cn(
													'size-5',
													isSelected
														? 'text-white'
														: 'text-blue-500'
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
