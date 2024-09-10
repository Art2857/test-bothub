import { z } from "zod";

export const changeRoleSchema = z.object({
  id: z.string().uuid(),
  role: z.number(),
});
