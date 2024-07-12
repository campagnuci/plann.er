import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ClientError } from '../errors/client-error'
import { prisma } from '../lib/prisma'

export async function getLinks (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/links', {
    schema: {
      summary: 'Get Links',
      tags: ['links'],
      params: z.object({
        tripId: z.string().uuid(),
      }),
      response: {
        200: z.object({
          links: z.array(z.object({
            id: z.string().uuid(),
            title: z.string(),
            url: z.string(),
            tripId: z.string().uuid(),
          }))
        }),
      }
    }
  }, async (request) => {
    const { tripId } = request.params

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      },
      include: {
        links: true
      },
    })

    if (!trip) {
      throw new ClientError('Trip not found.')
    }

    return { links: trip.links }
  })
}
