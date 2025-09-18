import { useMutation } from '@tanstack/react-query'
import { DownloadCloud } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaYoutube } from 'react-icons/fa'
import { toast } from 'sonner'

import { Button } from '../ui/button'

import type { CourseResponse } from '@/src/api/generated'
import { generateDownloadLink, resolveDownloadToken } from '@/src/api/requests'
import { APP_CONFIG, ROUTES } from '@/src/constants'
import { useAuth, useCurrent } from '@/src/hooks'

interface CourseActionsProps {
	course: CourseResponse
}

export function CourseActions({ course }: CourseActionsProps) {
	const router = useRouter()
	const { isAuthorized } = useAuth()
	const { user } = useCurrent()

	const { mutateAsync: generate, isPending: isGenerating } = useMutation({
		mutationFn: (courseId: string) => generateDownloadLink(courseId),
		onError() {
			toast.error('Не удалось сгенерировать ссылку')
		}
	})

	const handleDownload = async () => {
		if (!isAuthorized || !user?.isPremium)
			return router.push(ROUTES.PREMIUM)

		try {
			const { url } = await generate(course.id)

			window.open(url)
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className='relative flex flex-col gap-3 rounded-xl border border-border bg-background p-5'>
			<h2 className='text-xl font-semibold text-foreground'>
				Дополнительно
			</h2>
			<p className='text-sm text-neutral-600 dark:text-neutral-300'>
				Скачайте готовый код или смотрите курс на YouTube
			</p>
			<div className='flex flex-col gap-4'>
				<Button
					variant='primary'
					className='w-full'
					onClick={handleDownload}
					isLoading={isGenerating}
				>
					<DownloadCloud />
					Скачать код
				</Button>
				{course.youtubeUrl && (
					<Button variant='outline' className='w-full' asChild>
						<Link href={course.youtubeUrl} target='_blank'>
							<FaYoutube />
							Смотреть на YouTube
						</Link>
					</Button>
				)}
			</div>
		</div>
	)
}
