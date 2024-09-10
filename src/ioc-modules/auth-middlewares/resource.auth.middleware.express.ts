import { Request, Response, NextFunction } from "express";

import { ExpressMiddlewareContract } from "#libs/express";
import type { JWTServiceContract } from "#ioc-modules/technicals/jwt/static";
import { jwtPayloadDeserialize } from "#ioc-modules/auth/static";

export class AuthMiddleware implements ExpressMiddlewareContract {
  public constructor(private readonly jwtService: JWTServiceContract) {}

  public middleware(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void {
    return async (req, res, next) => {
      res.locals.hasAuth = false;

      if (!req.headers.authorization) {
        return next();
      }
      if (
        !req.headers.authorization.startsWith("Bearer ") &&
        !req.headers.authorization.startsWith("bearer ")
      ) {
        return next();
      }

      const token = req.headers.authorization.split(" ").at(-1) ?? "";
      const result = this.jwtService.safeVerify(token);

      if (result.ok === false) {
        return next();
      }

      try {
        const jwtPayload = jwtPayloadDeserialize(result.payload["payload"]);

        res.locals.hasAuth = true;
        res.locals.auth = jwtPayload;
      } catch (error) {
        console.debug(error, result.payload);
      } finally {
        return next();
      }
    };
  }
}
