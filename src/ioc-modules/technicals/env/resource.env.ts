import dotenv from "dotenv";
import path from "path";

import { envSchema } from "./resource.env.zod";

export const envRead = () => {
  const envFilepath = path.join(process.cwd(), ".env");

  dotenv.config({
    path: envFilepath,
  });

  const env = envSchema.parse(process.env);
  const envConst = env as Readonly<typeof env>;

  return envConst;
};
