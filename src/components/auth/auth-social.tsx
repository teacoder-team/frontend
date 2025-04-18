'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FaGithub } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'

import { Button } from '../ui/button'

import { getAuthUrl } from '@/src/api/external'

export function AuthSocial() {
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['oauth login'],
		mutationFn: (provider: 'google' | 'github') => getAuthUrl(provider),
		onSuccess(data) {
			router.push(data.url)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при создании URL'
			)
		}
	})

	return (
		<div className='grid w-full grid-cols-2 gap-4'>
			<Button
				onClick={() => mutate('google')}
				variant='outline'
				className='[&_svg]:size-[23px]'
				disabled={isPending}
			>
				<FcGoogle />
			</Button>
			<Button
				onClick={() => mutate('github')}
				variant='outline'
				className='[&_svg]:size-5'
				disabled={isPending}
			>
				<FaGithub />
			</Button>
		</div>
	)
}
