'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreditCardIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '../../shared/confirm-dialog'
import { Button } from '../../ui/button'

import type { AccountResponse } from '@/src/api/generated'
import { toggleAutoBilling } from '@/src/api/requests'

interface AutoBillingFormProps {
	user: AccountResponse | undefined
}

export function AutoBillingForm({ user }: AutoBillingFormProps) {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['toggle auto billing', user?.id],
		mutationFn: toggleAutoBilling,
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries({ queryKey: ['get current'] })
			toast.success(
				user?.isAutoBilling
					? 'Автосписания отключены'
					: 'Автосписания включены'
			)
		},
		onError: (error: any) => {
			toast.error(
				error.response?.data?.message ??
					'Не удалось изменить автосписания'
			)
		}
	})

	return (
		<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
			<div className='mr-5 flex w-full items-start gap-x-4 md:w-auto md:items-center'>
				<div className='hidden rounded-full bg-blue-600 p-2.5 md:flex'>
					<CreditCardIcon className='size-5 stroke-[1.7px] text-white' />
				</div>
				<div className='flex w-full flex-col'>
					<h2 className='mb-1 font-semibold'>
						Автоматическое списание
					</h2>
					<p className='text-sm text-muted-foreground'>
						Ежемесячно плата списывается автоматически.
						Автопродление можно отключить в любой момент.
					</p>
				</div>
			</div>
			<div>
				{user?.isAutoBilling ? (
					<ConfirmDialog
						open={isOpen}
						onOpenChange={setIsOpen}
						title='Отключение автосписаний'
						description='Вы уверены, что хотите отключить автоматическое списание? Подписка останется активной до конца оплаченного периода.'
						handleConfirm={mutate}
					>
						<Button
							variant='outline'
							onClick={() => setIsOpen(true)}
						>
							Выключить
						</Button>
					</ConfirmDialog>
				) : (
					<Button onClick={() => mutate()} variant='primary'>
						Включить
					</Button>
				)}
			</div>
		</div>
	)
}
