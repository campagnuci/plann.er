import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import nodemailer from 'nodemailer'
import { z } from 'zod'

import { env } from '../config/env'
import { ClientError } from '../errors/client-error'
import { dayjs } from '../lib/dayjs'
import { getMailClient } from '../lib/mailer'
import { prisma } from '../lib/prisma'
import { createTripHtml } from '../utils/mail/create-trip-html'
import { from } from '../utils/mail/from'

export async function createTrip (app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/trips', {
      schema: {
        summary: 'Create Trip',
        tags: ['trips'],
        body: z.object({
          destination: z.string().min(4),
          startsAt: z.coerce.date(),
          endsAt: z.coerce.date(),
          ownerName: z.string(),
          ownerEmail: z.string().email(),
          emailsToInvite: z.array(z.string().email()),
        }),
        response: {
          200: z.object({
            tripId: z.string().uuid()
          }),
          400: z.object({
            message: z.string(),
            errors: z.record(z.array(z.string()))
          })
        }
      }
    }, async (request) => {
      const { destination, startsAt, endsAt, ownerName, ownerEmail, emailsToInvite } = request.body

      if (dayjs(startsAt).isBefore(new Date())) {
        throw new ClientError('Invalid trip start date')
      }

      if (dayjs(endsAt).isBefore(startsAt)) {
        throw new ClientError('Invalid trip ends date')
      }

      const newParticipants = emailsToInvite.map((email) => { return { email } } )

      const trip = await prisma.trip.create({
        data: {
          destination,
          startsAt,
          endsAt,
          participants: {
            createMany: {
              data: [
                {
                  name: ownerName,
                  email: ownerEmail,
                  isOwner: true,
                  isConfirmed: true,
                },
                ...newParticipants,
              ]
            }
          }
        }
      })

      const formattedStartDate = dayjs(startsAt).format('LL')
      const formattedEndDate = dayjs(endsAt).format('LL')
      const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`

      const mail = await getMailClient()
      const message = await mail.sendMail({
        from,
        to: {
          name: ownerName,
          address: ownerEmail,
        },
        subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}`,
        html: createTripHtml({ destination: trip.destination, formattedStartDate, formattedEndDate, confirmationLink })
      })

      console.log(nodemailer.getTestMessageUrl(message))

      return { tripId: trip.id }
    })
}
