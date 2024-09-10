import express from "express";

type Handler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise<any>;

export const saveRoute = (handler: Handler) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const result = await handler(req, res, next);

      if (result === undefined) {
        res.status(204).send();
        return;
      }

      try {
        const json = JSON.stringify(result);
        res.status(200).type("application/json").send(json);
      } catch {
        res
          .status(200)
          .type("text/plain")
          .send(result + "");
      }
    } catch (error) {
      next(error);
    }
  };
};
