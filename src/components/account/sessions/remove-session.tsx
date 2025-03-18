import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '../../shared/confirm-dialog'
import { Button } from '../../ui/button'

import { revokeSession } from '@/src/api'

interface RevokeSessionProps {
	id: string
}

export function RevokeSession({ id }: RevokeSessionProps) {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['revoke session', id],
		mutationFn: () => revokeSession(id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get sessions'] })
			setIsOpen(false)
		},
		onError(error) {
			toast.error(error.message ?? 'Ошибка при удалении сессии')
		}
	})

	return (
		<ConfirmDialog
			title='Завершить сеанс на другом устройстве?'
			description='Вы собираетесь выйти с одного из ваших устройств. Вы уверены, что хотите продолжить?'
			confirmText='Выйти с устройства'
			destructive
			handleConfirm={() => mutate()}
			isLoading={isPending}
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Button variant='outline' size='sm'>
				Выйти
			</Button>
		</ConfirmDialog>
	)
}
