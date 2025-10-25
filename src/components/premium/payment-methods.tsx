import type { Control } from 'react-hook-form'

import { Skeleton } from '../ui/skeleton'

import type { PaymentFormValues } from './premium'
import { useGetPaymentMethods } from '@/src/api/hooks'
import { FormControl, FormField, FormItem } from '@/src/components/ui/form'
import { Label } from '@/src/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group'
import { PAYMENT_METHOD_ICONS } from '@/src/constants'
import { cn } from '@/src/lib/utils'

interface PaymentMethodsProps {
	control: Control<PaymentFormValues>
}

export function PaymentMethods({ control }: PaymentMethodsProps) {
	const { data, isLoading } = useGetPaymentMethods()

	if (isLoading || !data)
		return (
			<div className='flex flex-col gap-4'>
				{Array.from({ length: 3 }).map((_, index) => (
					<PaymentMethodSkeleton key={index} />
				))}
			</div>
		)

	const availableMethods = data?.filter(m => m.isAvailable)
	const comingSoonMethods = data?.filter(m => !m.isAvailable)

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
							{availableMethods.map(method => {
								const Icon = PAYMENT_METHOD_ICONS[method.id]
								const isSelected = field.value === method.id

								return (
									<Label
										key={method.id}
										htmlFor={method.id}
										className={cn(
											'flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-all duration-200',
											isSelected
												? 'border-blue-500 bg-blue-50 dark:border-border dark:bg-neutral-800'
												: 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-background'
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
											<Icon
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
											className='sr-only'
										/>
									</Label>
								)
							})}

							{comingSoonMethods.length > 0 && (
								<h3 className='text-[15px] font-medium text-muted-foreground'>
									Скоро
								</h3>
							)}

							{comingSoonMethods.map(method => {
								const Icon = PAYMENT_METHOD_ICONS[method.id]

								return (
									<Label
										key={method.id}
										htmlFor={method.id}
										className={cn(
											'flex cursor-not-allowed items-center gap-3 rounded-xl border p-3.5 opacity-50',
											'border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-neutral-800'
										)}
									>
										<div className='flex size-10 items-center justify-center rounded-lg bg-gray-300 dark:bg-neutral-600'>
											<Icon className='size-5 text-gray-500 dark:text-neutral-300' />
										</div>
										<div className='flex flex-1 flex-col'>
											<span className='font-medium text-gray-600 dark:text-gray-400'>
												{method.name}
											</span>
											<span className='mt-0.5 text-sm font-normal text-gray-500'>
												{method.description}
											</span>
										</div>

										<RadioGroupItem
											value={method.id}
											id={method.id}
											disabled
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

export function PaymentMethodSkeleton() {
	return (
		<div className='flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3.5 dark:border-neutral-700 dark:bg-neutral-900'>
			<Skeleton className='h-10 w-10 rounded-lg' />
			<div className='flex flex-1 flex-col gap-2'>
				<Skeleton className='h-4 w-1/3' />
				<Skeleton className='h-3 w-2/3' />
			</div>
		</div>
	)
}
