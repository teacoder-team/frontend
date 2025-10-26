'use client'

import { useRouter } from 'next/navigation'
import { FaGoogle } from 'react-icons/fa6'
import { toast } from 'sonner'

import { Heading } from '../../shared/heading'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { Skeleton } from '../../ui/skeleton'

import { ConnectionError } from './connection-error'
import { UnlinkProvider } from './unlink-provider'
import {
	useFetchSsoStatus,
	useGetAvailableSsoProviders,
	useSsoConnect
} from '@/src/api/hooks'
import { SSO_PROVIDERS } from '@/src/constants'

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

	return (
		<>
			<div className='w-full'>
				<div className='mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-xl'>
					<Heading
						title='Сторонние сервисы'
						description='Подключите и управляйте своими аккаунтами на сторонних сервисах, таких как Google и GitHub'
					/>
					<div className='mt-2 space-y-5'>
						{isLoadingProviders || isLoadingStatus
							? Array.from({ length: 4 }).map((_, index) => (
									<ConnectionsSkeleton key={index} />
								))
							: availableProviders?.map((provider, index) => {
									const meta =
										SSO_PROVIDERS[
											provider as keyof typeof SSO_PROVIDERS
										]

									if (!meta) return null

									// @ts-ignore
									const isConnected = ssoStatus?.[provider]

									return (
										<Card
											key={index}
											className='shadow-none'
										>
											<CardContent className='flex items-center justify-between p-4'>
												<div className='flex items-center gap-x-3'>
													<div className='rounded-full bg-blue-600 p-2.5'>
														{provider ===
														'google' ? (
															<FaGoogle className='size-5 text-white' />
														) : (
															<meta.icon className='size-5 text-white' />
														)}
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

export function ConnectionsSkeleton() {
	return (
		<Card className='shadow-none'>
			<CardContent className='flex items-center justify-between p-4'>
				<div className='flex items-center gap-x-3'>
					<Skeleton className='h-10 w-10 rounded-full' />
					<div className='flex flex-1 flex-col gap-2'>
						<Skeleton className='h-4 w-24 rounded-md' />
						<Skeleton className='h-3 w-40 rounded-md' />
					</div>
				</div>
				<Skeleton className='h-10 w-28 rounded-lg' />
			</CardContent>
		</Card>
	)
}
