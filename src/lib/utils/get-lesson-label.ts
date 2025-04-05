export function getLessonLabel(count: number) {
	if (count % 10 === 1 && count % 100 !== 11) {
		return 'урок'
	} else if (
		count % 10 >= 2 &&
		count % 10 <= 4 &&
		(count % 100 < 10 || count % 100 >= 20)
	) {
		return 'урока'
	} else {
		return 'уроков'
	}
}
