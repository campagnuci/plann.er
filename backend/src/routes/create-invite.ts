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

export async function createInvite (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/invites', {
    schema: {
      body: z.object({
        email: z.string().email()
      }),
      params: z.object({
        tripId: z.string().uuid()
      })
    }
  }, async (request) => {
    const { tripId } = request.params
    const { email } = request.body

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      }
    })

    if (!trip) {
      throw new ClientError('Trip not found.')
    }

    const participant = await prisma.participant.create({
      data: {
        email,
        tripId
      }
    })

    const formattedStartDate = dayjs(trip.startsAt).format('LL')
    const formattedEndDate = dayjs(trip.endsAt).format('LL')

    const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`

    const mail = await getMailClient()
    const message = await mail.sendMail({
      from,
      to: participant.email,
      subject: `Confirme sua participação na viagem para ${trip.destination} em ${formattedStartDate}`,
      html: inviteParticipantHtml({ destination: trip.destination, formattedStartDate, formattedEndDate, confirmationLink })
    })
    console.log(nodemailer.getTestMessageUrl(message))

    return { participantId: participant.id }
  })
}
