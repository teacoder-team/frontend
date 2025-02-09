import { Smartphone } from 'lucide-react'

import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

export function TwoStepAuthForm() {
	return (
		<div className='flex flex-col gap-y-3'>
			<h2 className='text-[19px] font-medium shadow-none'>
				Многофакторная аутентификация
			</h2>
			<Card>
				<CardContent className='flex items-center justify-between p-4'>
					<div className='mr-5 flex items-center gap-x-4'>
						<div className='rounded-full bg-blue-500 p-2.5'>
							<Smartphone className='size-5 stroke-[1.7px] text-white' />
						</div>
						<div>
							<h2 className='font-semibold'>
								Приложение для аутентификации
							</h2>
							<p className='text-sm text-muted-foreground'>
								Обеспечьте безопасность своего аккаунта с
								помощью двухфакторной аутентификации через TOTP.
							</p>
						</div>
					</div>
					<div>
						<Button variant='primary'>Включить</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
