'use client'

import { ChartArea, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'

import { useLogout } from '@/src/api/hooks'
import { instance } from '@/src/api/instance'
import { ROUTES } from '@/src/constants'
import { useCurrent } from '@/src/hooks/useCurrent'
import { cookies } from '@/src/lib/cookie'
import { getMediaSource } from '@/src/lib/utils'

export function UserMenu() {
	const router = useRouter()

	const { user } = useCurrent()

	const { mutate } = useLogout({
		onSuccess() {
			cookies.remove('token')

			delete instance.defaults.headers['X-Session-Token']

			router.push(ROUTES.AUTH.LOGIN())
		},
		onError(error: any) {
			toast.error(error.response?.data?.message ?? 'Ошибка при выходе')
		}
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='relative size-10 rounded-full'
				>
					<Avatar>
						<AvatarImage
							src={getMediaSource(user?.avatar ?? '', 'users')}
							alt='Аватарка'
						/>
						<AvatarFallback>
							{user?.displayName.slice(0, 1)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end'>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>
							{user?.displayName}
						</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={ROUTES.ACCOUNT.ROOT}>
							<ChartArea />
							Мой прогресс
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href={ROUTES.ACCOUNT.SETTINGS}>
							<Settings />
							Настройки
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => mutate()}
						className='!text-rose-600'
					>
						<LogOut />
						Выйти
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
