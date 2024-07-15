import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import nodemailer from 'nodemailer'
import { z } from 'zod'

import dayjs from 'dayjs'
import { ClientError } from '../errors/client-error'
import { getMailClient } from '../lib/mailer'
import { prisma } from '../lib/prisma'
import { cancelTripHtml } from '../utils/mail/cancel-trip-html'
import { from } from '../utils/mail/from'

export async function deleteTrip (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete('/trips/:tripId', {
    schema: {
      summary: 'Delete trip',
      tags: ['trips'],
      params: z.object({
        tripId: z.string().uuid(),
      }),
      response: {
        204: z.null()
      }
    }
  }, async (request, reply) => {
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
            email: true
          }
        },
        links: {
          select: {
            id: true
          }
        },
        activities: {
          select: {
            id: true
          }
        }
      },
    })

    if (!trip) {
      throw new ClientError('Trip not found.')
    }

    await prisma.trip.delete({
      where: {
        id: trip.id
      }
    })

    const formattedStartDate = dayjs(trip.startsAt).format('LL')
    const formattedEndDate = dayjs(trip.endsAt).format('LL')

    const mail = await getMailClient()
    await Promise.all(trip.participants.map(async (participant) => {
      const message = await mail.sendMail({
        from,
        to: participant.email,
        subject: `A viagem que você fazia parte para ${trip.destination} em ${formattedStartDate} foi cancelada.`,
        html: cancelTripHtml({ destination: trip.destination, formattedStartDate, formattedEndDate })
      })
      console.log(nodemailer.getTestMessageUrl(message))
    }))

    reply.status(204).send()
  })
}
