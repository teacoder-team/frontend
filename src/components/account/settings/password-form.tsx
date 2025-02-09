import { KeyRound } from 'lucide-react'

import { Button } from '../../ui/button'

export function PasswordForm() {
	return (
		<div className='flex items-center justify-between'>
			<div className='mr-5 flex items-center gap-x-4'>
				<div className='rounded-full bg-blue-500 p-2.5'>
					<KeyRound className='size-5 stroke-[1.7px] text-white' />
				</div>
				<div className='mr-5'>
					<h2 className='mb-1 font-semibold'>Пароль</h2>
					<p className='text-sm text-muted-foreground'>
						Пароль — ключ к вашей учетной записи. Никому его не
						сообщайте. При необходимости вы можете изменить его
						здесь для повышения безопасности.
					</p>
				</div>
			</div>
			<div>
				<Button variant='outline'>Изменить</Button>
			</div>
		</div>
	)
}
