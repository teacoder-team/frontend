export const mockUserData = {
	points: 850,
	rank: 12,
	totalUsers: 1245,
	completedCourses: 3,
	inProgressCourses: 2,
	totalLessons: 45,
	completedLessons: 32,
	completionPercentage: 71
}

export const mockCourses = [
	{
		id: '1',
		title: 'Основы веб-разработки',
		slug: 'web-development-basics',
		completedLessons: 8,
		totalLessons: 10,
		progress: 80,
		lastAccessed: '2023-05-15T10:30:00Z'
	},
	{
		id: '2',
		title: 'JavaScript для начинающих',
		slug: 'javascript-basics',
		completedLessons: 12,
		totalLessons: 15,
		progress: 80,
		lastAccessed: '2023-05-18T14:20:00Z'
	},
	{
		id: '3',
		title: 'React: продвинутый уровень',
		slug: 'advanced-react',
		completedLessons: 6,
		totalLessons: 12,
		progress: 50,
		lastAccessed: '2023-05-20T09:15:00Z'
	},
	{
		id: '4',
		title: 'TypeScript с нуля',
		slug: 'typescript-basics',
		completedLessons: 4,
		totalLessons: 8,
		progress: 50,
		lastAccessed: '2023-05-22T16:45:00Z'
	},
	{
		id: '5',
		title: 'Основы UI/UX дизайна',
		slug: 'ui-ux-basics',
		completedLessons: 2,
		totalLessons: 10,
		progress: 20,
		lastAccessed: '2023-05-25T11:30:00Z'
	}
]

export const mockLeaderboard = [
	{ id: '1', username: 'alex_dev', points: 1250, position: 1 },
	{ id: '2', username: 'maria_code', points: 1120, position: 2 },
	{ id: '3', username: 'john_programmer', points: 980, position: 3 },
	{ id: '4', username: 'dev_master', points: 920, position: 4 },
	{ id: '5', username: 'code_ninja', points: 890, position: 5 },
	{
		id: '6',
		username: 'current_user',
		points: 850,
		position: 6,
		isCurrentUser: true
	},
	{ id: '7', username: 'web_wizard', points: 820, position: 7 },
	{ id: '8', username: 'js_lover', points: 780, position: 8 },
	{ id: '9', username: 'react_fan', points: 750, position: 9 },
	{ id: '10', username: 'typescript_dev', points: 720, position: 10 }
]
