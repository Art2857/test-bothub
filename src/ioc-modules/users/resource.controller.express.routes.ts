import { omit } from "lodash";
import express from "express";

import { ExpressMapPubError } from "#libs/express";

import * as Schemas from "./resource.controller.express.zod";
import { UserCRUDServiceContract } from "./types";

export class UserCRUDController {
  public constructor(private readonly userService: UserCRUDServiceContract) {}

  @ExpressMapPubError
  public async me(
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) {
    /// TODO: replace on get from database
    return res.locals.auth!.user;
  }

  @ExpressMapPubError
  public async changeRole(
    req: express.Request,
    _res: express.Response,
    _next: express.NextFunction
  ) {
    const body = Schemas.changeRoleSchema.parse({
      id: req.params["id"],
      role: typeof req.body === "object" && req.body ? req.body["role"] : null,
    });

    const response = await this.userService.changeRole(body);

    const { user } = response;

    return omit(user, "passwordHash");
  }
}
