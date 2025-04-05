import { config } from 'dotenv'
import { defineConfig } from 'orval'

config({ path: '.env' })

export default defineConfig({
	client: {
		input: `${process.env['API_DOCS']}/openapi.json`,
		output: {
			schemas: './src/generated'
		}
	}
})
