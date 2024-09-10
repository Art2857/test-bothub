import express from "express";

import * as LibsExpress from "#libs/express";

import { AuthServiceContract } from "./types";
import { AuthController } from "./resource.controller.express.routes";

export const AuthRouter = (authService: AuthServiceContract) => {
  const routes = new AuthController(authService);

  const router = express.Router();
  router.post(
    "/register",
    LibsExpress.saveRoute(routes.processRegisterStage1CreateTicket.bind(routes))
  );
  /// TODO: replace on post request
  router.get(
    "/register-verify",
    LibsExpress.saveRoute(routes.processRegisterStage2VerifyTicket.bind(routes))
  );
  router.post("/login", LibsExpress.saveRoute(routes.login.bind(routes)));

  return ["/users", router] as LibsExpress.ExpressAppRouter;
};
