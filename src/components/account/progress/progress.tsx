'use client'

import { Award, ChevronRight, Trophy, Users } from 'lucide-react'
import { useState } from 'react'

import { Heading } from '../../shared/heading'

import { CoursesList } from './courses-list'
import { CoursesTab } from './courses-tab'
import { Leaderboard } from './leaderboard'
import { mockLeaderboard } from './mock'
import { UserStats } from './user-stats'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/src/components/ui/card'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/src/components/ui/tabs'

export function Progress() {
	const [activeTab, setActiveTab] = useState('overview')

	return (
		<div className='w-full pb-10'>
			<div className='mx-auto flex h-full max-w-6xl flex-col gap-6'>
				<Heading
					title='Мой прогресс'
					description='Отслеживайте свой прогресс обучения, достижения и рейтинг среди других пользователей.'
				/>

				<Tabs
					defaultValue='overview'
					value={activeTab}
					className='w-full'
					onValueChange={setActiveTab}
				>
					<TabsList className='mb-6'>
						<TabsTrigger value='overview'>Обзор</TabsTrigger>
						<TabsTrigger value='courses'>Курсы</TabsTrigger>
						<TabsTrigger value='leaderboard'>Рейтинг</TabsTrigger>
					</TabsList>

					<TabsContent value='overview' className='space-y-6'>
						<UserStats />
						<CoursesList
							onViewAll={() => setActiveTab('courses')}
						/>
						<Leaderboard
							limit={5}
							showButton
							onViewAll={() => setActiveTab('leaderboard')}
						/>
					</TabsContent>

					<TabsContent value='courses' className='space-y-6'>
						<CoursesTab />
					</TabsContent>

					<TabsContent value='leaderboard' className='space-y-6'>
						<Leaderboard />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
