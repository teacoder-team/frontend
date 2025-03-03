import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Input } from '../../ui/input'

import { changeAvatar } from '@/src/api/users'
import type { AccountResponse } from '@/src/generated'
import { getMediaSource } from '@/src/lib/utils'

interface AvatarFormProps {
	user: AccountResponse | undefined
}

export function AvatarForm({ user }: AvatarFormProps) {
	const [preview, setPreview] = useState<string | null>(
		user?.avatar ? getMediaSource(`/avatars/${user.avatar}`) : null
	)

	const { mutateAsync } = useMutation({
		mutationKey: ['uploadAvatar'],
		mutationFn: (data: FormData) => changeAvatar(data),
		onSuccess: () => {
			toast.success('Аватар успешно обновлён!')
		},
		onError(error) {
			toast.error(error.message || 'Ошибка при обновлении аватара')
		}
	})

	async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files

		if (files?.length) {
			const formData = new FormData()

			formData.append('file', files[0])
			console.log(formData)

			await mutateAsync(formData)
		}
	}

	return (
		<div className='flex items-center gap-x-3'>
			<label className='cursor-pointer'>
				<Avatar className='size-14'>
					<AvatarImage src={preview ?? ''} alt='Аватарка' />
					<AvatarFallback className='text-xl'>
						{user?.displayName.slice(0, 1)}
					</AvatarFallback>
				</Avatar>
				<Input
					type='file'
					accept='image/jpeg, image/png, image/webp, image/gif'
					className='hidden'
					onChange={handleFileChange}
				/>
			</label>
			<div className='flex flex-col'>
				<h2 className='font-semibold'>Аватарка</h2>
				<p className='text-sm text-muted-foreground'>
					Форматы: JPEG, PNG, WEBP, GIF. Макс. размер: 10 МБ.
				</p>
			</div>
		</div>
	)
}
