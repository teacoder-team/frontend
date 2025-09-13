import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '../../shared/confirm-dialog'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

import { logout } from '@/src/api/requests'

export function AccountActions() {
	const [isOpen, setIsOpen] = useState(false)

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => logout(),
		onSuccess() {
			setIsOpen(false)
			push('/auth/login')
		},
		onError(error: any) {
			toast.error(error.response?.data?.message ?? 'Ошибка при выходе')
		}
	})

	return (
		<div className='flex flex-col gap-y-3 pb-10'>
			<h2 className='text-[19px] font-medium'>Действия</h2>
			<Card className='border-rose-500 shadow-none'>
				<CardContent className='p-4'>
					<div className='space-y-8'>
						<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
							<div className='mr-5'>
								<h2 className='font-semibold'>Выход</h2>
								<p className='text-sm text-muted-foreground'>
									Завершите сеанс, чтобы выйти из аккаунта на
									этом устройстве.
								</p>
							</div>
							<ConfirmDialog
								open={isOpen}
								onOpenChange={setIsOpen}
								title='Выход из аккаунта'
								description='Вы уверены, что хотите завершить сеанс и выйти из аккаунта?'
								handleConfirm={() => mutate()}
							>
								<Button variant='outline'>Выйти</Button>
							</ConfirmDialog>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
