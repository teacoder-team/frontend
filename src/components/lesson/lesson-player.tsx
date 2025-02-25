'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'

import { type KinescopePlayer } from '../shared/player'

interface LessonPlayerProps {
	videoId: string
}

const Player = dynamic(
	() => import('../shared/player').then(mod => mod.Player),
	{
		ssr: false
	}
)

export function LessonPlayer({ videoId }: LessonPlayerProps) {
	const playerRef = useRef<KinescopePlayer | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	function handlePlayerReady() {
		setIsLoading(false)
	}

	return (
		<div className='relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-lg'>
			{isLoading && <p className='absolute'>Загрузка...</p>}
			<Player
				forwardRef={playerRef}
				videoId={videoId}
				onReady={handlePlayerReady}
			/>
		</div>
	)
}
