import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '../../shared/confirm-dialog'
import { Button } from '../../ui/button'

import { useUnlinkAccount } from '@/src/api/hooks'

interface UnlinkProviderProps {
	provider: 'google' | 'github'
}

export function UnlinkProvider({ provider }: UnlinkProviderProps) {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate, isPending } = useUnlinkAccount({
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['fetch sso status']
			})
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
			title={`Отключить ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
			description={`Вы уверены, что хотите отключить аккаунт ${provider.charAt(0).toUpperCase() + provider.slice(1)}? После этого вы не сможете входить с его помощью.`}
			confirmText='Отключить'
			destructive
			handleConfirm={() => mutate({ provider })}
			isLoading={isPending}
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Button variant='outline'>Отвязать</Button>
		</ConfirmDialog>
	)
}
