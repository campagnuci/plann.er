import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ClientError } from '../errors/client-error'
import { dayjs } from '../lib/dayjs'
import { prisma } from '../lib/prisma'

export async function getActivities (app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/trips/:tripId/activities', {
      schema: {
        summary: 'Get Activities',
        tags: ['activities'],
        params: z.object({
          tripId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            activities: z.array(z.object({
              date: z.date(),
              activities: z.object({
                id: z.string().uuid(),
                title: z.string(),
                occursAt: z.date(),
                tripId: z.string().uuid(),
              }).array(),
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
          activities: {
            orderBy: {
              occursAt: 'asc'
            }
          }
        },
      })

      if (!trip) {
        throw new ClientError('Trip not found.')
      }

      const differenceInDaysBetweenTripStartAndEnd = dayjs(trip.endsAt).diff(trip.startsAt, 'days')
      const activities = Array.from({ length: differenceInDaysBetweenTripStartAndEnd + 1 }).map((_, index) => {
        const date = dayjs(trip.startsAt).add(index, 'day')
        return {
          date: date.toDate(),
          activities: trip.activities.filter((activity) => {
            return dayjs(activity.occursAt).isSame(date, 'day')
          })
        }
      })

      return { activities }
    })
}
