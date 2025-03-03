import Link from 'next/link'
import type { ReactNode } from 'react'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '../ui/card'

interface Props {
	children: ReactNode
	heading: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
}

export function AuthWrapper({
	children,
	heading,
	description,
	backButtonLabel,
	backButtonHref
}: Props) {
	return (
		<div className='flex h-[100vh] w-full items-center justify-center'>
			<div className='flex w-full flex-col items-center gap-4'>
				<Card className='w-[440px] border-none'>
					<CardHeader className='mt-2 grid gap-y-2 text-center'>
						<CardTitle className='text-3xl'>{heading}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent>
						{/* {isShowSocial && <Social />} */}
						{children}
					</CardContent>
					<CardFooter className='flex-col'>
						{/* {backButtonLabel && backButtonHref && (
					<Button variant='link' className='w-full font-normal'>
						<Link href={backButtonHref}>{backButtonLabel}</Link>
					</Button>
				)} */}
						<p className='text-center text-xs text-muted-foreground'>
							Нажимая продолжить, вы соглашаетесь с нашим{' '}
							<Link
								href='/docs/agreement'
								className='text-primary hover:underline'
								target='_blank'
							>
								Пользовательским соглашением
							</Link>{' '}
							и{' '}
							<Link
								href='/docs/privacy'
								className='text-primary hover:underline'
								target='_blank'
							>
								Политикой Конфиденциальности
							</Link>
							.
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
