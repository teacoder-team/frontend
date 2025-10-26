'use client'

import { useRouter } from 'next/navigation'
import { type ReactNode } from 'react'
import { toast } from 'sonner'

import { Heading } from '../../shared/heading'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

import { ConnectionError } from './connection-error'
import { UnlinkProvider } from './unlink-provider'
import {
	useFetchSsoStatus,
	useGetAvailableSsoProviders,
	useSsoConnect
} from '@/src/api/hooks'
import { SSO_PROVIDERS } from '@/src/constants'

interface Provider {
	id: 'google' | 'github' | 'discord'
	name: string
	icon: ReactNode
	description: string
}

export function Connections() {
	const router = useRouter()

	const { data: availableProviders, isLoading: isLoadingProviders } =
		useGetAvailableSsoProviders()
	const { data: ssoStatus, isLoading: isLoadingStatus } = useFetchSsoStatus()

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

	if (isLoadingProviders || isLoadingStatus)
		return <div>Loading status...</div>

	return (
		<>
			<div className='w-full'>
				<div className='mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-xl'>
					<Heading
						title='Сторонние сервисы'
						description='Подключите и управляйте своими аккаунтами на сторонних сервисах, таких как Google и GitHub'
					/>
					<div className='mt-2 space-y-5'>
						{availableProviders?.map((provider, index) => {
							const meta =
								SSO_PROVIDERS[
									provider as keyof typeof SSO_PROVIDERS
								]

							if (!meta) return null

							// @ts-ignore
							const isConnected = ssoStatus?.[provider]

							return (
								<Card key={index} className='shadow-none'>
									<CardContent className='flex items-center justify-between p-4'>
										<div className='flex items-center gap-x-3'>
											<div className='rounded-full bg-blue-600 p-2.5'>
												<meta.icon className='size-5 text-white' />
											</div>
											<div>
												<h2 className='font-semibold'>
													{meta.name}
												</h2>
												<p className='text-sm text-muted-foreground'>
													{meta.description}
												</p>
											</div>
										</div>
										{isConnected ? (
											<UnlinkProvider
												provider={provider}
											/>
										) : (
											<Button
												onClick={() =>
													mutate({
														provider
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
							)
						})}
					</div>
				</div>
			</div>
			<ConnectionError />
		</>
	)
}
