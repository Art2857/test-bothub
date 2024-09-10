import express from "express";

export type ExpressAppRouter = [string, express.Router];

export type ExpressMiddlewareContract<Args = void> = {
  middleware(
    ...args: Args extends void ? [] : [Args]
  ): (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void | Promise<void>;
};
