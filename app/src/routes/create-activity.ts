import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { dayjs } from '../lib/dayjs'
import { prisma } from '../lib/prisma'

export async function createActivity (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/activities', {
    schema: {
      body: z.object({
        title: z.string().min(4),
        occursAt: z.coerce.date(),
      }),
      params: z.object({
        tripId: z.string().uuid(),
      })
    }
  }, async (request) => {
    const { tripId } = request.params
    const { title, occursAt } = request.body

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      }
    })

    if (!trip) {
      throw new Error('Trip not found.')
    }

    if (dayjs(occursAt).isBefore(trip.startsAt)) {
      throw new Error('Invalid activity date.')
    }

    if (dayjs(occursAt).isAfter(trip.endsAt)) {
      throw new Error('Invalid activity date.')
    }

    const activity = await prisma.activity.create({
      data: {
        title,
        occursAt,
        tripId
      }
    })

    return { activityId: activity.id }
  })
}
