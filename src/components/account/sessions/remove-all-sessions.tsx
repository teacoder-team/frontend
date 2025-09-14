import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '../../shared/confirm-dialog'
import { Button } from '../../ui/button'

import { removeAllSessions } from '@/src/api/requests'

export function RemoveAllSessions() {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['remove all sessions'],
		mutationFn: () => removeAllSessions(),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get sessions'] })
			setIsOpen(false)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при отключении'
			)
		}
	})

	return (
		<ConfirmDialog
			title='Выйти из всех устройств?'
			description='Вы будете разлогинены на всех устройствах, кроме текущего. Вы уверены, что хотите продолжить?'
			confirmText='Удалить все сессии'
			destructive
			handleConfirm={() => mutate()}
			isLoading={isPending}
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Button variant='outline' size='sm'>
				Выйти на всех устройствах
			</Button>
		</ConfirmDialog>
	)
}
