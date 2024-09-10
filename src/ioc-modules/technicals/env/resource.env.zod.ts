import { z } from "zod";

export const envSchema = z.object({
  IS_DEV: z.coerce.boolean().optional().default(false),

  URL_SERVER_API: z.string(),

  DATABASE_URL: z.string(),

  MAIL_SENDER_HOST: z.string(),
  MAIL_SENDER_PORT: z.coerce.number(),
  MAIL_SENDER_SENDER: z.string().optional(),
  MAIL_SENDER_USER: z.string(),
  MAIL_SENDER_PASS: z.string(),

  HASHER_SALT: z.string(),

  CRYPTO_SECRET: z.string(),

  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRES_IN: z.string(),
});
