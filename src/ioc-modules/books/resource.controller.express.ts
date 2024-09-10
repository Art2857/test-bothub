import express from "express";

import * as LibsExpress from "#libs/express";
import type { AuthRequiredMiddleware } from "#ioc-modules/auth-middlewares/static";
import { ROLE_ADMIN } from "#ioc-modules/roles/static";

import { BooksCRUDServiceContract } from "./types";
import { BooksCRUDController } from "./resource.controller.express.routes";

export const booksCRUDRouter = (
  crudService: BooksCRUDServiceContract,
  {
    authRequired,
  }: {
    authRequired: AuthRequiredMiddleware;
  }
) => {
  const routes = new BooksCRUDController(crudService);

  const router = express.Router();
  router.post(
    "/",
    authRequired.middleware({
      roleMask: ROLE_ADMIN,
    }),
    LibsExpress.saveRoute(routes.create.bind(routes))
  );
  router.get("/", LibsExpress.saveRoute(routes.findAll.bind(routes)));
  router.get("/:id", LibsExpress.saveRoute(routes.findById.bind(routes)));
  router.put(
    "/:id",
    authRequired.middleware({
      roleMask: ROLE_ADMIN,
    }),
    LibsExpress.saveRoute(routes.update.bind(routes))
  );
  router.delete(
    "/:id",
    authRequired.middleware({
      roleMask: ROLE_ADMIN,
    }),
    LibsExpress.saveRoute(routes.delete.bind(routes))
  );

  return ["/books", router] as LibsExpress.ExpressAppRouter;
};
