import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'

import { User } from '@/src/types'

interface AvatarFormProps {
	user: User | undefined
}

export function AvatarForm({ user }: AvatarFormProps) {
	return (
		<div className='flex items-center gap-x-3'>
			<Avatar className='size-14'>
				<AvatarImage src={user?.avatar} alt='Аватарка' />
				<AvatarFallback className='text-xl'>
					{user?.displayName.slice(0, 1)}
				</AvatarFallback>
			</Avatar>
			<div className='flex flex-col'>
				<h2 className='font-semibold'>Аватарка</h2>
				<p className='text-sm text-muted-foreground'>
					Поддерживаемые форматы: JPEG, JPG, PNG, WEBP или GIF. Макс.
					размер: 10 МБ.
				</p>
			</div>
		</div>
	)
}
