import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ClientError } from '../errors/client-error'
import { prisma } from '../lib/prisma'

export async function getTripDetails (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId', {
    schema: {
      summary: 'Get Trip Details',
      tags: ['trips'],
      params: z.object({
        tripId: z.string().uuid(),
      }),
      response: {
        200: z.object({
          trip: z.object({
            id: z.string().uuid(),
            destination: z.string(),
            startsAt: z.date(),
            endsAt: z.date(),
            isConfirmed: z.boolean(),
          })
        }),
        400: z.object({
          message: z.string(),
          errors: z.record(z.array(z.string()))
        })
      }
    }
  }, async (request) => {
    const { tripId } = request.params

    const trip = await prisma.trip.findUnique({
      select: {
        id: true,
        destination: true,
        startsAt: true,
        endsAt: true,
        isConfirmed: true
      },
      where: { id: tripId }
    })

    if (!trip) {
      throw new ClientError('Trip not found.')
    }

    return { trip }
  })
}
