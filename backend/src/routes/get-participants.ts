import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ClientError } from '../errors/client-error'
import { prisma } from '../lib/prisma'

export async function getParticipants (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/participants', {
    schema: {
      summary: 'Get Participants in a Trip',
      tags: ['trips'],
      params: z.object({
        tripId: z.string().uuid(),
      }),
      response: {
        200: z.object({
          participants: z.array(z.object({
            id: z.string().uuid(),
            isConfirmed: z.boolean(),
            name: z.string().nullable(),
            email: z.string().email(),
          }))
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
      where: {
        id: tripId
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            isConfirmed: true
          }
        }
      },
    })

    if (!trip) {
      throw new ClientError('Trip not found.')
    }

    return { participants: trip.participants }
  })
}
