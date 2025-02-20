import { Mail, MoreHorizontal, Pencil } from 'lucide-react'

import { Button } from '../../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../ui/dropdown-menu'

import type { AccountResponse } from '@/src/generated'

interface EmailFormProps {
	user: AccountResponse | undefined
}

export function EmailForm({ user }: EmailFormProps) {
	return (
		<div className='flex items-center justify-between'>
			<div className='mr-5 flex items-center gap-x-4'>
				<div className='rounded-full bg-blue-500 p-2.5'>
					<Mail className='size-5 stroke-[1.7px] text-white' />
				</div>
				<div className='mr-5 flex flex-1 flex-col'>
					<div className='mb-1 flex items-center gap-2'>
						<h2 className='font-semibold'>Почта</h2>
						{/* {user?.isEmailVerified ? (
							<Badge variant='success'>Подтверждёна</Badge>
						) : (
							<Badge variant='error'>Не подтверждёна</Badge>
						)} */}
					</div>
					<p className='text-sm text-muted-foreground'>
						Ваша учетная запись привязана к адресу{' '}
						<span className='font-medium text-primary'>
							{user?.email}
						</span>
						. На него мы отправляем важные уведомления и информацию
						о безопасности.
					</p>
				</div>
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild className='border-none ring-0'>
						<Button variant='ghost' size='icon'>
							<MoreHorizontal className='size-5' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' side='top'>
						<DropdownMenuGroup>
							{/* {!user?.isEmailVerified && (
								<DropdownMenuItem>
									<Check />
									Подтвердить
								</DropdownMenuItem>
							)} */}
							<DropdownMenuItem>
								<Pencil />
								Изменить
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
