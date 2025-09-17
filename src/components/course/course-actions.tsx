import { useMutation } from '@tanstack/react-query'
import { DownloadCloud } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaYoutube } from 'react-icons/fa'
import { toast } from 'sonner'

import { Button } from '../ui/button'

import type { CourseResponse } from '@/src/api/generated'
import { generateDownloadLink, resolveDownloadToken } from '@/src/api/requests'
import { ROUTES } from '@/src/constants'
import { useAuth } from '@/src/hooks'

interface CourseActionsProps {
	course: CourseResponse
}

export function CourseActions({ course }: CourseActionsProps) {
	const router = useRouter()

	const { isAuthorized } = useAuth()

	const { mutateAsync: generate, isPending: isGenerating } = useMutation({
		mutationFn: (courseId: string) => generateDownloadLink(courseId),
		onError() {
			toast.error('Не удалось сгенерировать ссылку')
		}
	})

	const { mutateAsync: resolve, isPending: isResolving } = useMutation({
		mutationFn: (token: string) => resolveDownloadToken(token),
		onError() {
			toast.error('Не удалось скачать файл')
		}
	})

	const handleDownload = async () => {
		if (!isAuthorized)
			return router.push(ROUTES.login(ROUTES.course(course.slug)))

		try {
			const { token } = await generate(course.id)

			const blob = await resolve(token)

			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `${course.title}.zip`
			document.body.appendChild(a)
			a.click()
			a.remove()
			window.URL.revokeObjectURL(url)
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
					isLoading={isGenerating || isResolving}
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
