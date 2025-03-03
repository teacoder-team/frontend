import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '../../shared/confirm-dialog'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

import { logout } from '@/src/api'

export function AccountActions() {
	const [isLogoutOpen, setIsLogoutOpen] = useState(false)

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => logout(),
		onSuccess() {
			setIsLogoutOpen(false)
			push('/auth/login')
		},
		onError(error) {
			if (error.message) {
				toast.error(error.message)
			} else {
				toast.error('Ошибка при выходе')
			}
		}
	})

	return (
		<div className='flex flex-col gap-y-3 pb-10'>
			<h2 className='text-[19px] font-medium'>Действия</h2>
			<Card className='border-rose-500 shadow-none'>
				<CardContent className='p-4'>
					<div className='space-y-8'>
						<div className='flex items-center justify-between'>
							<div className='mr-5'>
								<h2 className='font-semibold'>Выход</h2>
								<p className='text-sm text-muted-foreground'>
									Завершите сеанс, чтобы выйти из аккаунта на
									этом устройстве.
								</p>
							</div>
							<ConfirmDialog
								open={isLogoutOpen}
								onOpenChange={setIsLogoutOpen}
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
