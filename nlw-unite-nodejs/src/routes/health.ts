import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export const health = async (app: FastifyInstance) => {
	app
		.withTypeProvider<ZodTypeProvider>()
		.get('/health', async (request, response) => {
			return response.status(200).send('OK!')
		})
}
