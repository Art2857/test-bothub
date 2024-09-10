import { AuthJwtPayload } from "./types";

declare global {
  namespace Express {
    export interface Locals {
      hasAuth: boolean;
      auth?: AuthJwtPayload;
    }
  }
}

export {};
