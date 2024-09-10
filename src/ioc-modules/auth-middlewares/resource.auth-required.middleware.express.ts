import { Request, Response, NextFunction } from "express";

import { UnauthorizedException } from "#libs/exceptions";
import { ExpressMiddlewareContract } from "#libs/express";
import type { RolesServiceContract } from "#ioc-modules/roles/static";

type Args = {
  roleMask?: number;
};

export class AuthRequiredMiddleware
  implements ExpressMiddlewareContract<void | Args>
{
  public constructor(private readonly rolesService: RolesServiceContract) {}

  public middleware(
    args?: Args
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (_req, res, next) => {
      if (!res.locals.hasAuth) {
        return next(new UnauthorizedException("Unauthorized"));
      }

      if (args && typeof args.roleMask === "number") {
        if (
          !this.rolesService.intersectionMask(
            res.locals.auth!.user.role,
            args.roleMask
          )
        ) {
          return next(new UnauthorizedException("Unauthorized"));
        }
      }

      next();
    };
  }
}
