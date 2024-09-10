import express from "express";

import { HttpException } from "#libs/exceptions";

import * as Schemas from "./resource.controller.express.zod";
import { AuthServiceContract } from "./types";

export class AuthController {
  public constructor(private readonly authService: AuthServiceContract) {}

  public async processRegisterStage1CreateTicket(
    req: express.Request,
    _res: express.Response,
    _next: express.NextFunction
  ) {
    try {
      const body = Schemas.processRegisterStage1CreateTicketSchema.parse(
        req.body
      );

      await this.authService.processRegisterStage1CreateTicket(body);

      return {
        /** plug */
      };
    } catch {
      throw new HttpException("Unauthorized", 401);
    }
  }

  public async processRegisterStage2VerifyTicket(
    req: express.Request,
    _res: express.Response,
    _next: express.NextFunction
  ) {
    try {
      const body = Schemas.processRegisterStage2VerifyTicketSchema.parse(
        req.query
      );

      const response = await this.authService.processRegisterStage2VerifyTicket(
        {
          email: body.email,
          username: body.username,
          passwordHash: body.passwordHash,
          verifyHash: body.verifyHash,
          ticket: {
            rid: body.rid,
            lifetimeMs: body.lifetimeMs,
            createdAt: body.createdAt,
            deadAt: body.deadAt,
          },
        }
      );

      const { token } = response.jwt;
      return { token };
    } catch {
      throw new HttpException("Unauthorized", 401);
    }
  }

  public async login(
    req: express.Request,
    _res: express.Response,
    _next: express.NextFunction
  ) {
    try {
      const body = Schemas.loginSchema.parse(req.body);

      const response = await this.authService.login(body);

      const { token } = response.jwt;
      return { token };
    } catch {
      throw new HttpException("Unauthorized", 401);
    }
  }
}
