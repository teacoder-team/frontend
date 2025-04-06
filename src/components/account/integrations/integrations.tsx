'use client'

import { FaGithub, FaGoogle, FaTelegram, FaYandex } from 'react-icons/fa6'

import { Heading } from '../../shared/heading'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

export function Integrations() {
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
							<Button variant='outline'>Подключить</Button>
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
							<Button variant='outline'>Подключить</Button>
						</CardContent>
					</Card>
					<Card className='shadow-none'>
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
							<Button variant='outline'>Подключить</Button>
						</CardContent>
					</Card>
					<Card className='shadow-none'>
						<CardContent className='flex items-center justify-between p-4'>
							<div className='flex items-center gap-x-3'>
								<div className='rounded-full bg-blue-600 p-2.5'>
									<FaTelegram className='size-5 text-white' />
								</div>
								<div>
									<h2 className='font-semibold'>Telegram</h2>
									<p className='text-sm text-muted-foreground'>
										Set up a single sign-on with Telegram
										and login with one click.
									</p>
								</div>
							</div>
							<Button variant='outline'>Подключить</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
