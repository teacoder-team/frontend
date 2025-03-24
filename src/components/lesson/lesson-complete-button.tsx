'use client'

import { useMutation } from '@tanstack/react-query'
import { CircleCheckBig, CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '../ui/button'

import { createProgress } from '@/src/api'
import type { LessonResponse } from '@/src/generated'
import { cn } from '@/src/lib/utils'

interface LessonCompleteButtonProps {
	lesson: LessonResponse
	completedLessons: string[]
}

export function LessonCompleteButton({
	lesson,
	completedLessons
}: LessonCompleteButtonProps) {
	const { push, refresh } = useRouter()

	const isCompleted = completedLessons.includes(lesson.id)

	const { mutate, isPending } = useMutation({
		mutationKey: ['create progress course'],
		mutationFn: () =>
			createProgress({
				isCompleted: !isCompleted,
				lessonId: lesson.id
			}),
		onSuccess(data) {
			refresh()

			if (data.nextLesson && data.isCompleted)
				push(`/lesson/${data.nextLesson}`)

			if (!data.nextLesson && data.isCompleted) {
			}
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Ошибка при обновлении прогресса'
			)
		}
	})

	const Icon = isCompleted ? CircleX : CircleCheckBig

	return (
		<div className='fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 p-4 backdrop-blur-sm'>
			<div className='mx-auto flex max-w-5xl items-center justify-between gap-4'>
				<div className='flex-1'>
					<p className='text-sm font-medium'>
						{isCompleted
							? 'Вы завершили этот урок!'
							: 'Вы готовы завершить этот урок?'}
					</p>
					<p className='text-sm text-muted-foreground'>
						{isCompleted
							? 'Отличная работа! Вы можете посмотреть свою статистику в личном кабинете.'
							: 'Не забудьте завершить урок, когда будете готовы.'}
					</p>
				</div>
				<Button
					onClick={() => mutate()}
					variant='outline'
					size='lg'
					className={cn(
						'min-w-52 transition-all duration-200 ease-in-out',
						!isCompleted &&
							'bg-emerald-600 !text-white hover:bg-emerald-600/90'
					)}
					isLoading={isPending}
				>
					{isPending ? (
						'Загрузка...'
					) : (
						<>
							<Icon />
							{isCompleted ? 'Отменить' : 'Продолжить'}
						</>
					)}
				</Button>
			</div>
		</div>
	)
}
