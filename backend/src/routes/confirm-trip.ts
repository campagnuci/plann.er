import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import nodemailer from 'nodemailer'
import { z } from 'zod'

import { env } from '../config/env'
import { ClientError } from '../errors/client-error'
import { dayjs } from '../lib/dayjs'
import { getMailClient } from '../lib/mailer'
import { prisma } from '../lib/prisma'
import { from } from '../utils/mail/from'
import { inviteParticipantHtml } from '../utils/mail/invite-participant-html'

export async function confirmTrip (app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/trips/:tripId/confirm', {
      schema: {
        summary: 'Confirm Trip',
        tags: ['trips'],
        params: z.object({
          tripId: z.string().uuid(),
        }),
        response: {
          302: z.null(),
          400: z.object({
            message: z.string(),
            errors: z.record(z.array(z.string()))
          })
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
            where: {
              isOwner: false
            }
          }
        }
      })

      if (!trip) {
        throw new ClientError('Trip not found.')
      }

      if (trip.isConfirmed) {
        return reply.redirect(`${env.FRONTEND_BASE_URL}/trips/${tripId}`)
      }

      await prisma.trip.update({
        where: { id: tripId },
        data: { isConfirmed: true }
      })

      const formattedStartDate = dayjs(trip.startsAt).format('LL')
      const formattedEndDate = dayjs(trip.endsAt).format('LL')

      const mail = await getMailClient()

      await Promise.all(trip.participants.map(async (participant) => {
        const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`
        const message = await mail.sendMail({
          from,
          to: participant.email,
          subject: `Confirme sua participação na viagem para ${trip.destination} em ${formattedStartDate}`,
          html: inviteParticipantHtml({ destination: trip.destination, formattedStartDate, formattedEndDate, confirmationLink })
        })
        console.log(nodemailer.getTestMessageUrl(message))
      }))

      return reply.redirect(`${env.FRONTEND_BASE_URL}/trips/${tripId}`)
    })
}
