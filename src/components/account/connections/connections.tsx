'use client'

import { useRouter } from 'next/navigation'
import { type ReactNode } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { toast } from 'sonner'

import { Heading } from '../../shared/heading'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

import { ConnectionError } from './connection-error'
import { UnlinkProvider } from './unlink-provider'
import { useFetchSsoStatus, useSsoConnect } from '@/src/api/hooks'

interface Provider {
	id: 'google' | 'github'
	name: string
	icon: ReactNode
	description: string
}

export const providers: Provider[] = [
	{
		id: 'google',
		name: 'Google',
		icon: <FaGoogle className='size-5 text-white' />,
		description:
			'Настройте вход через Google для удобной и быстрой авторизации'
	},
	{
		id: 'github',
		name: 'Github',
		icon: <FaGithub className='size-5 text-white' />,
		description:
			'Настройте вход через Github для удобной и быстрой авторизации'
	}
]

export function Connections() {
	const router = useRouter()

	const { data, isLoading } = useFetchSsoStatus()

	const { mutate, isPending } = useSsoConnect({
		onSuccess(data) {
			router.push(data.url)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при подключении'
			)
		}
	})

	if (isLoading) return <div>Loading status...</div>

	return (
		<>
			<div className='w-full'>
				<div className='mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-xl'>
					<Heading
						title='Сторонние сервисы'
						description='Подключите и управляйте своими аккаунтами на сторонних сервисах, таких как Google и GitHub'
					/>
					<div className='mt-2 space-y-5'>
						{providers.map((provider, index) => (
							<Card key={index} className='shadow-none'>
								<CardContent className='flex items-center justify-between p-4'>
									<div className='flex items-center gap-x-3'>
										<div className='rounded-full bg-blue-600 p-2.5'>
											{provider.icon}
										</div>
										<div>
											<h2 className='font-semibold'>
												{provider.name}
											</h2>
											<p className='text-sm text-muted-foreground'>
												{provider.description}
											</p>
										</div>
									</div>
									{data?.[provider.id] ? (
										<UnlinkProvider
											provider={provider.id}
										/>
									) : (
										<Button
											onClick={() =>
												mutate({
													provider: provider.id
												})
											}
											variant='outline'
											isLoading={isPending}
										>
											Привязать
										</Button>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
			<ConnectionError />
		</>
	)
}
