'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '../ui/button'

import { useGetAvailableSsoProviders } from '@/src/api/hooks'
import { getAuthUrl } from '@/src/api/requests'
import { SSO_PROVIDERS } from '@/src/constants'

export function AuthSocial() {
	const router = useRouter()

	const { data, isLoading } = useGetAvailableSsoProviders()

	const { mutate, isPending } = useMutation({
		mutationKey: ['oauth login'],
		mutationFn: (provider: string) => getAuthUrl(provider),
		onSuccess(data) {
			router.push(data.url)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Ошибка при создании URL'
			)
		}
	})

	if (isLoading) return <div>Loading...</div>

	return (
		<div className='flex flex-col gap-4'>
			<div className='grid w-full grid-cols-4 gap-4'>
				{data?.map((provider, index) => {
					const meta =
						SSO_PROVIDERS[provider as keyof typeof SSO_PROVIDERS]

					if (!meta) return null

					return (
						<Button
							onClick={() => mutate(meta.id)}
							variant='outline'
							className='[&_svg]:size-[21px]'
							disabled={isPending}
						>
							<meta.icon
								style={{
									color: meta.color
								}}
							/>
						</Button>
					)
				})}
			</div>
			{/* <PasskeyLoginButton /> */}
		</div>
	)
}
