import express from "express";

import * as LibsExpress from "#libs/express";
import { type AuthRequiredMiddleware } from "#ioc-modules/auth-middlewares/static";
import { ROLE_ADMIN } from "#ioc-modules/roles/static";

import { UserCRUDServiceContract } from "./types";
import { UserCRUDController } from "./resource.controller.express.routes";

export const userCRUDRouter = (
  crudService: UserCRUDServiceContract,
  {
    authRequired,
  }: {
    authRequired: AuthRequiredMiddleware;
  }
) => {
  const routes = new UserCRUDController(crudService);

  const router = express.Router();
  router.get(
    "/me",
    authRequired.middleware(),
    LibsExpress.saveRoute(routes.me.bind(routes))
  );
  router.put(
    "/:id/role",
    authRequired.middleware({
      roleMask: ROLE_ADMIN,
    }),
    LibsExpress.saveRoute(routes.changeRole.bind(routes))
  );

  return ["/users", router] as LibsExpress.ExpressAppRouter;
};
