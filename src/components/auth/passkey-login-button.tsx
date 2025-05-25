'use client'

import { KeyRound } from 'lucide-react'

import { Button } from '../ui/button'

export function PasskeyLoginButton() {
	return (
		<Button variant='outline' className='[&_svg]:size-5'>
			<KeyRound />
			Вход по ключу доступа
		</Button>
	)
}
