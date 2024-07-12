import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ClientError } from '../errors/client-error'
import { prisma } from '../lib/prisma'

export async function getParticipant (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId', {
    schema: {
      summary: 'Get Participants',
      tags: ['participants'],
      params: z.object({
        participantId: z.string().uuid(),
      }),
      response: {
        200: z.object({
          participant: z.object({
            id: z.string().uuid(),
            email: z.string().email(),
            name: z.string().nullable(),
            isConfirmed: z.boolean(),
          })
        }),
      }
    }
  }, async (request) => {
    const { participantId } = request.params

    const participant = await prisma.participant.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        isConfirmed: true
      },
      where: {
        id: participantId
      }
    })

    if (!participant) {
      throw new ClientError('Participant not found.')
    }

    return { participant }
  })
}
