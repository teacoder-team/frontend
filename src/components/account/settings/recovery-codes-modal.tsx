'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Download, RotateCcw, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '../../ui/alert'
import { Button } from '../../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger
} from '../../ui/dialog'
import { Separator } from '../../ui/separator'

import { fetchRecovery, regenerateRecovery } from '@/src/api'

export function RecoveryCodesModal() {
	const [isOpen, setIsOpen] = useState(false)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['fetch recovery codes'],
		queryFn: () => fetchRecovery(),
		enabled: isOpen
	})

	const { mutate: regenerate, isPending } = useMutation({
		mutationKey: ['regenerate recovery codes'],
		mutationFn: () => regenerateRecovery(),
		onSuccess() {
			refetch()
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Ошибка при генерации новых кодов'
			)
		}
	})

	function splitArrayIntoColumns(arr: string[]) {
		if (!arr || arr.length === 0) return [[], [], []]

		const mid = Math.ceil(arr.length / 3)
		const first = arr.slice(0, mid)
		const second = arr.slice(mid, mid * 2)
		const third = arr.slice(mid * 2)

		return [first, second, third]
	}

	function handleDownload() {
		const recoveryCodesText = data?.join('\n')

		const blob = new Blob([recoveryCodesText!], { type: 'text/plain' })
		const fileURL = window.URL.createObjectURL(blob)
		const link = document.createElement('a')

		link.href = fileURL
		link.setAttribute('download', 'teacoder_recovery_codes.txt')

		document.body.appendChild(link)
		link.click()

		setTimeout(() => window.URL.revokeObjectURL(fileURL), 0)
	}

	const recoveryCodes = data ? splitArrayIntoColumns(data) : [[], [], []]

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>Просмотреть</Button>
			</DialogTrigger>
			<DialogContent className='w-[500px]'>
				<DialogTitle>Коды восстановления</DialogTitle>
				<DialogDescription>
					Эти коды помогут вам получить доступ к учетной записи, если
					вы потеряете доступ к устройству и не сможете получать коды
					двухфакторной аутентификации.
				</DialogDescription>
				<Alert variant='warning'>
					<TriangleAlert className='size-5' />
					<AlertTitle className='ml-1.5'>
						Пожалуйста, храните их в безопасном месте.
					</AlertTitle>
					<AlertDescription className='ml-1.5'>
						Они — последний способ восстановления доступа к учетной
						записи.
					</AlertDescription>
				</Alert>
				<div className='flex justify-center gap-10'>
					<div className='flex flex-col'>
						{recoveryCodes[0].map((code, index) => (
							<p key={index} className='text-[17px] font-medium'>
								{code}
							</p>
						))}
					</div>
					<div className='flex flex-col'>
						{recoveryCodes[1].map((code, index) => (
							<p key={index} className='text-[17px] font-medium'>
								{code}
							</p>
						))}
					</div>
					<div className='flex flex-col'>
						{recoveryCodes[2].map((code, index) => (
							<p key={index} className='text-[17px] font-medium'>
								{code}
							</p>
						))}
					</div>
				</div>
				<Separator />
				<DialogFooter className='gap-x-2'>
					<Button
						variant='outline'
						className='h-9'
						onClick={() => regenerate()}
						disabled={isPending}
					>
						<RotateCcw className='size-3' />
						Сбросить
					</Button>
					<Button
						variant='primary'
						className='h-9'
						onClick={handleDownload}
					>
						<Download className='size-3' />
						Скачать
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
