export function formatDate(date: string | Date): string {
	const createdAt = new Date(date)
	const formattedDate = new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: 'long',
		hour: '2-digit',
		minute: '2-digit'
	}).format(createdAt)

	const [day, month, year, time] = formattedDate.split(' ')

	return `${day} ${month} в ${time}`
}
