'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { type ReactNode, useEffect } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { toast } from 'sonner'

import { Heading } from '../../shared/heading'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

import { ConnectionError } from './connection-error'
import { UnlinkProvider } from './unlink-provider'
import { fetchExternalStatus, getConnectUrl } from '@/src/api/requests'

interface Provider {
	name: string
	icon: ReactNode
	key: 'google' | 'github'
	description: string
}

export const providers: Provider[] = [
	{
		name: 'Google',
		icon: <FaGoogle className='size-5 text-white' />,
		key: 'google',
		description:
			'Настройте вход через Google для удобной и быстрой авторизации'
	},
	{
		name: 'Github',
		icon: <FaGithub className='size-5 text-white' />,
		key: 'github',
		description:
			'Настройте вход через Github для удобной и быстрой авторизации'
	}
]

export function Connections() {
	const router = useRouter()

	const { data, isLoading } = useQuery({
		queryKey: ['fetch external status'],
		queryFn: () => fetchExternalStatus()
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['connect external account'],
		mutationFn: (provider: 'google' | 'github') => getConnectUrl(provider),
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
									{data?.[provider.key] ? (
										<UnlinkProvider
											provider={provider.key}
										/>
									) : (
										<Button
											onClick={() => mutate(provider.key)}
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
