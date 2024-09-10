import jwt from "jsonwebtoken";

import * as LibsExceptions from "#libs/exceptions";

import { AuthServiceContractEntities, JWTServiceContract } from "./types";

export class JWTService implements JWTServiceContract {
  public constructor(
    private readonly secret: string,
    private readonly expiresIn: string
  ) {}

  public sign(props: { payload: Record<string, any> }): {
    jwt: AuthServiceContractEntities["Jwt"];
  } {
    const token = jwt.sign(props.payload, this.secret, {
      expiresIn: this.expiresIn,
    });

    return {
      jwt: { token },
    };
  }

  public verify(token: string): { payload: Record<string, any> } {
    try {
      const payload = jwt.verify(token, this.secret);

      if (typeof payload === "string") {
        throw new Error("Unauthorized:0x1");
      }

      return { payload };
    } catch (error) {
      throw new LibsExceptions.UnauthorizedException("Unauthorized:0x2");
    }
  }

  public safeVerify(
    token: string
  ):
    | { ok: true; payload: Record<string, any> }
    | { ok: false; message?: string } {
    try {
      const payload = this.verify(token);
      return { ok: true, payload };
    } catch (error) {
      return { ok: false, message: (error as Error).message };
    }
  }
}
