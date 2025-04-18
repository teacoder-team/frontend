'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FaGithub, FaGoogle, FaTelegram, FaYandex } from 'react-icons/fa6'
import { toast } from 'sonner'

import { Heading } from '../../shared/heading'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

import { UnlinkProvider } from './unlink-provider'
import { fetchExternalStatus, getConnectUrl } from '@/src/api/external'

export function Integrations() {
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
		<div className='w-full'>
			<div className='mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-xl'>
				<Heading
					title='Сторонние сервисы'
					description='Подключите и управляйте своими аккаунтами на сторонних сервисах, таких как Google, GitHub и Telegram'
				/>
				<div className='mt-2 space-y-5'>
					<Card className='shadow-none'>
						<CardContent className='flex items-center justify-between p-4'>
							<div className='flex items-center gap-x-3'>
								<div className='rounded-full bg-blue-600 p-2.5'>
									<FaGoogle className='size-5 text-white' />
								</div>
								<div>
									<h2 className='font-semibold'>Google</h2>
									<p className='text-sm text-muted-foreground'>
										Set up a single sign-on with Google and
										login with one click.
									</p>
								</div>
							</div>
							{data?.google ? (
								<UnlinkProvider provider='google' />
							) : (
								<Button
									onClick={() => mutate('google')}
									variant='outline'
									isLoading={isPending}
								>
									Привязать
								</Button>
							)}
						</CardContent>
					</Card>
					<Card className='shadow-none'>
						<CardContent className='flex items-center justify-between p-4'>
							<div className='flex items-center gap-x-3'>
								<div className='rounded-full bg-blue-600 p-2.5'>
									<FaGithub className='size-5 text-white' />
								</div>
								<div>
									<h2 className='font-semibold'>Github</h2>
									<p className='text-sm text-muted-foreground'>
										Set up a single sign-on with Github and
										login with one click.
									</p>
								</div>
							</div>
							{data?.github ? (
								<UnlinkProvider provider='github' />
							) : (
								<Button
									onClick={() => mutate('github')}
									variant='outline'
									isLoading={isPending}
								>
									Привязать
								</Button>
							)}
						</CardContent>
					</Card>
					{/* <Card className='shadow-none'>
						<CardContent className='flex items-center justify-between p-4'>
							<div className='flex items-center gap-x-3'>
								<div className='rounded-full bg-blue-600 p-2.5'>
									<FaYandex className='size-5 pr-0.5 text-white' />
								</div>
								<div>
									<h2 className='font-semibold'>Yandex</h2>
									<p className='text-sm text-muted-foreground'>
										Set up a single sign-on with Yandex and
										login with one click.
									</p>
								</div>
							</div>
							<Button variant='outline'>
								{data?.yandex ? 'Отвязать' : 'Привязать'}
							</Button>
						</CardContent>
					</Card> */}
				</div>
			</div>
		</div>
	)
}
