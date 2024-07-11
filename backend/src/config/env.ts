import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'tests']).default('development'),
  DATABASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  FRONTEND_BASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number().default(587),
  MAIL_SECURE: z.coerce.boolean().default(false),
  MAIL_AUTH_USER: z.string(),
  MAIL_AUTH_PASS: z.string()
})

export const env = envSchema.parse(process.env)
