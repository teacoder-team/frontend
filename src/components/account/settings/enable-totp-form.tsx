'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Check, Copy, TriangleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '../../ui/alert'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../../ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../../ui/form'
import { Input } from '../../ui/input'

import { mfaAPI } from '@/src/api'

const EnableTotpSchema = z.object({
	pin: z.string().min(6, {
		message: 'PIN-код должен содержать минимум 6 символов'
	}),
	secret: z.string()
})

export type EnableTotp = z.infer<typeof EnableTotpSchema>

export function EnableTotpForm() {
	const [isOpen, setIsOpen] = useState(false)
	const [step, setStep] = useState(1)

	const [isCopied, setIsCopied] = useState(false)

	const { mutate, data: totp } = useMutation({
		mutationKey: ['totp generate secret'],
		mutationFn: () => mfaAPI.totpGenerateSecret()
	})

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['fetch recovery codes'],
		queryFn: () => mfaAPI.fetchRecovery(),
		enabled: step === 2
	})

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['totp enable'],
		mutationFn: (data: EnableTotp) => mfaAPI.totpEnable(data),
		onSuccess() {
			refetch()
			setStep(2)
		},
		onError(error) {
			if (error.message) {
				toast.error(error.message)
			} else {
				toast.error('Ошибка при верификации кода')
			}
		}
	})

	const form = useForm<EnableTotp>({
		resolver: zodResolver(EnableTotpSchema),
		defaultValues: {
			pin: '',
			secret: ''
		}
	})

	function onCopy() {
		if (!totp?.secret) return

		setIsCopied(true)
		navigator.clipboard.writeText(totp?.secret)
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}

	const Icon = isCopied ? Check : Copy

	useEffect(() => {
		if (isOpen) {
			mutate()
		}
	}, [mutate, isOpen])

	function splitArrayIntoColumns(arr: string[]) {
		if (!arr || arr.length === 0) return [[], [], []]

		const mid = Math.ceil(arr.length / 3)
		const first = arr.slice(0, mid)
		const second = arr.slice(mid, mid * 2)
		const third = arr.slice(mid * 2)

		return [first, second, third]
	}

	async function onSubmit(data: EnableTotp) {
		mutateAsync({
			pin: data.pin,
			secret: totp?.secret ?? ''
		})
	}

	const recoveryCodes = data ? splitArrayIntoColumns(data) : [[], [], []]

	return (
		<Dialog
			open={isOpen}
			onOpenChange={state => {
				form.reset()
				setIsOpen(state)
			}}
		>
			<DialogTrigger asChild>
				<Button variant='primary'>Включить</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[590px]'>
				<DialogHeader>
					<DialogTitle>
						{step === 1
							? 'Приложения для аутентификации'
							: 'Коды восстановления'}
					</DialogTitle>
					<DialogDescription>
						{step === 1
							? 'Each time you log in, in addition to your password, you use an authenticator app to  generate a one-time code.'
							: 'Эти коды помогут вам получить доступ к учетной записи, если вы потеряете доступ к устройству и не сможете получать коды двухфакторной аутентификации.'}
					</DialogDescription>
				</DialogHeader>

				{step === 1 && (
					<div className='flex flex-col space-y-5'>
						<div>
							<div className='flex items-center gap-2 font-medium'>
								<Badge>Шаг 1</Badge>
								Отсканируйте QR-код
							</div>
							<p className='mt-2 text-sm text-muted-foreground'>
								Scan the QR code below or manually enter the
								secret key into your authenticator app.
							</p>
							<div className='mt-4 grid grid-cols-2 items-center gap-4 rounded-lg bg-accent p-3'>
								<img
									src={totp?.qrCodeUrl}
									alt='QR-код'
									className='w-full rounded-lg'
								/>
								<div>
									<h3 className='font-medium'>
										Проблемы с QR-кодом?
									</h3>
									<p className='mt-1 text-sm text-muted-foreground'>
										Enter this secret installed:
									</p>
									<div className='mt-2 h-8 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-[13px]'>
										{totp?.secret}
									</div>
									<Button
										onClick={onCopy}
										variant='outline'
										size='xs'
										className='mt-2 bg-white'
										disabled={
											!totp?.secret ||
											isCopied ||
											isPending
										}
									>
										<Icon />
										Копировать
									</Button>
								</div>
							</div>
						</div>
						<div>
							<div className='flex items-center gap-2 font-medium'>
								<Badge>Шаг 2</Badge>
								Верификация кода
							</div>
							<p className='mt-2 text-sm text-muted-foreground'>
								Enter the 6-digit code you see in your
								authenticator app.
							</p>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className='mt-4'
								>
									<FormField
										control={form.control}
										name='pin'
										render={({ field }) => (
											<FormItem className='flex flex-col justify-center max-sm:items-center'>
												<FormLabel>
													Введите код
												</FormLabel>
												<FormControl>
													<Input
														placeholder='XXXXXX'
														disabled={isPending}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<DialogFooter className='mt-5'>
										<DialogClose asChild>
											<Button variant='outline'>
												Отмена
											</Button>
										</DialogClose>
										<Button
											type='submit'
											variant='primary'
											isLoading={isPending}
										>
											Продолжить
										</Button>
									</DialogFooter>
								</form>
							</Form>
						</div>
					</div>
				)}

				{step === 2 && (
					<div className='flex flex-col space-y-5'>
						<Alert variant='warning'>
							<TriangleAlert className='size-5' />
							<AlertTitle className='ml-1.5'>
								Пожалуйста, храните их в безопасном месте.
							</AlertTitle>
							<AlertDescription className='ml-1.5'>
								Они — последний способ восстановления доступа к
								учетной записи.
							</AlertDescription>
						</Alert>
						<div className='mt-4 flex justify-center gap-16 rounded-lg bg-accent p-3'>
							<div className='flex flex-col'>
								{recoveryCodes[0].map((code, index) => (
									<p
										key={index}
										className='text-[17px] font-medium'
									>
										{code}
									</p>
								))}
							</div>
							<div className='flex flex-col'>
								{recoveryCodes[1].map((code, index) => (
									<p
										key={index}
										className='text-[17px] font-medium'
									>
										{code}
									</p>
								))}
							</div>
							<div className='flex flex-col'>
								{recoveryCodes[2].map((code, index) => (
									<p
										key={index}
										className='text-[17px] font-medium'
									>
										{code}
									</p>
								))}
							</div>
						</div>
						<DialogFooter className='flex gap-x-2 sm:justify-between'>
							<DialogClose asChild>
								<Button variant='outline' className='h-9'>
									Закрыть
								</Button>
							</DialogClose>
							<div className='flex items-center gap-2'>
								<Button
									variant='outline'
									className='h-9'
									disabled={isPending}
								>
									Копировать
								</Button>
								<Button
									variant='primary'
									className='h-9'
									// onClick={handleDownload}
								>
									Скачать
								</Button>
							</div>
						</DialogFooter>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
