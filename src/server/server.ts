import { config } from 'dotenv'
import http from 'http'
import next from 'next'

config({ path: '.env' })

const PORT = process.env['APP_PORT'] ?? 3000
const app = next({ dev: true })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	try {
		const server = http.createServer((req, res) => {
			handle(req, res)
		})

		server.listen(PORT, () => {
			console.log(`🚀 Server started on ${process.env['APP_URL']}`)
			console.log(`🔧 Backend is running at: ${process.env['API_URL']}`)
		})
	} catch (error) {
		console.error(`❌ Error starting the server: ${error} 😞`)
	}
})
