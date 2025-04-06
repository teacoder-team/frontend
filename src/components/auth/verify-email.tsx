import { Button } from '../ui/button'

import { AuthWrapper } from './auth-wrapper'

export function VerifyEmail() {
	return (
		<AuthWrapper heading='Верификация почты'>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit,
				est?
			</p>
			<Button variant='primary' className='mt-5 w-full'>
				Продолжить
			</Button>
		</AuthWrapper>
	)
}
