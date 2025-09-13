import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Input } from '../../ui/input'

import type { AccountResponse } from '@/src/api/generated'
import { changeAvatar } from '@/src/api/requests'
import { getMediaSource } from '@/src/lib/utils'

interface AvatarFormProps {
	user: AccountResponse | undefined
}

export function AvatarForm({ user }: AvatarFormProps) {
	const [preview, setPreview] = useState<string | null>(
		user?.avatar ? getMediaSource(user.avatar, 'users') : null
	)

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['change user avatar'],
		mutationFn: (data: FormData) => changeAvatar(data),
		onSuccess: data => {
			setPreview(getMediaSource(data.file_id, 'users'))
			queryClient.invalidateQueries({ queryKey: ['get current'] })
			toast.success('Аватар успешно обновлён')
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при обновлении аватара'
			)
		}
	})

	async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]

		if (file) {
			const formData = new FormData()
			formData.append('file', file)

			console.log('File added to FormData:', formData.get('file'))

			mutate(formData)
		} else {
			toast.error('Пожалуйста, выберите файл')
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
