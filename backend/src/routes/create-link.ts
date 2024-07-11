import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ClientError } from '../errors/client-error'
import { prisma } from '../lib/prisma'

export async function createLink (app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/trips/:tripId/links', {
      schema: {
        summary: 'Create Link',
        tags: ['links'],
        body: z.object({
          title: z.string().min(4),
          url: z.string().url(),
        }),
        params: z.object({
          tripId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            linkId: z.string().uuid()
          }),
          400: z.object({
            message: z.string(),
            errors: z.record(z.array(z.string()))
          })
        }
      }
    }, async (request) => {
      const { tripId } = request.params
      const { title, url } = request.body

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId
        }
      })

      if (!trip) {
        throw new ClientError('Trip not found.')
      }

      const link = await prisma.link.create({
        data: {
          title,
          url,
          tripId
        }
      })

      return { linkId: link.id }
    })
}
