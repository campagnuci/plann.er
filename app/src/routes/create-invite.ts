import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import nodemailer from 'nodemailer'
import { z } from 'zod'

import { env } from '../config/env'
import { ClientError } from '../errors/client-error'
import { dayjs } from '../lib/dayjs'
import { getMailClient } from '../lib/mailer'
import { prisma } from '../lib/prisma'

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

    const mail = await getMailClient()

    const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`
    const message = await mail.sendMail({
      from: {
        name: 'Equipe plann.er',
        address: 'noreply@plann.er'
      },
      to: participant.email,
      subject: `Confirme sua viagem para ${trip.destination} em ${formattedStartDate}`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
          <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
          <p></p>
          <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
          <p></p>
          <p><a href="${confirmationLink}">Confirmar Viagem</a></p>
          <p></p>
          <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
        </div>
      `.trim()
    })
    console.log(nodemailer.getTestMessageUrl(message))

    return { participantId: participant.id }
  })
}
