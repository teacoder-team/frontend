import { FaGithub, FaGoogle, FaTelegram, FaYandex } from 'react-icons/fa6'

import { Button } from '../ui/button'

export function AuthSocial() {
	return (
		<div className='grid w-full grid-cols-4 gap-4'>
			<Button variant='outline' className='[&_svg]:size-[17px]'>
				<FaGoogle />
			</Button>
			<Button variant='outline' className='[&_svg]:size-[17px]'>
				<FaGithub />
			</Button>
			<Button variant='outline' className='[&_svg]:size-[17px]'>
				<FaYandex />
			</Button>
			<Button variant='outline' className='[&_svg]:size-[17px]'>
				<FaTelegram />
			</Button>
		</div>
	)
}
