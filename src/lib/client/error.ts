export class APIError extends Error {
	public constructor(
		public statusCode: number,
		public message: string
	) {
		super(message)

		Object.setPrototypeOf(this, new.target.prototype)
	}
}
