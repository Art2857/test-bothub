import { z } from "zod";

export const createSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publicationDate: z.coerce.date(),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
});

export const findByIdSchema = z.object({
  id: z.string().uuid().min(1, "Id is required"),
});

export const updateSchema = z.object({
  id: z.string().uuid().min(1, "Id is required"),
  title: z.string().min(1, "Title is required").optional(),
  author: z.string().min(1, "Author is required").optional(),
  publicationDate: z.coerce.date().optional(),
  genres: z
    .array(z.string())
    .min(1, "At least one genre is required")
    .optional(),
});

export const deleteSchema = z.object({
  id: z.string().uuid().min(1, "Id is required"),
});
