import { z } from "zod";

export const processRegisterStage1CreateTicketSchema = z.object({
  email: z.string().email(),
  username: z.string().min(8, "Username is required"),
  password: z.string().min(8, "Password is required"),
});

export const processRegisterStage2VerifyTicketSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  passwordHash: z.string(),
  verifyHash: z.string(),
  rid: z.string(),
  lifetimeMs: z.coerce.number(),
  createdAt: z.coerce.date(),
  deadAt: z.coerce.date(),
});

export const loginSchema = z.object({
  username: z.string().min(8, "Username is required"),
  password: z.string().min(8, "Password is required"),
});
