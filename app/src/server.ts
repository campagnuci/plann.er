import cors from '@fastify/cors'
import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import { confirmParticipant } from './routes/confirm-participant'
import { confirmTrip } from './routes/confirm-trip'
import { createActivity } from './routes/create-activity'
import { createInvite } from './routes/create-invite'
import { createLink } from './routes/create-link'
import { createTrip } from './routes/create-trip'
import { getActivities } from './routes/get-activities'
import { getLinks } from './routes/get-links'
import { getParticipant } from './routes/get-participant'
import { getParticipants } from './routes/get-participants'
import { getTripDetails } from './routes/get-trip-details'
import { updateTrip } from './routes/update-trip'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: '*'
})

app.register(createTrip)
app.register(confirmTrip)
app.register(updateTrip)
app.register(getTripDetails)

app.register(confirmParticipant)
app.register(getParticipants)
app.register(getParticipant)

app.register(createActivity)
app.register(getActivities)

app.register(createLink)
app.register(getLinks)

app.register(createInvite)

app.listen({ port: 3333 }).then(() => {
  console.log('Server listening on port 3333')
})
