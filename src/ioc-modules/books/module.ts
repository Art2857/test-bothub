import depfy from "depfy";

import * as LibsExpress from "#libs/express";
import * as IocModulePrisma from "#ioc-modules/technicals/prisma";
import * as IocModuleAuthMiddlewares from "#ioc-modules/auth-middlewares";

import { BooksCRUDService } from "./resource.crud.service";
import { booksCRUDRouter } from "./resource.controller.express";
import { BooksCRUDServiceContract } from "./types";

export default depfy.injectable({
  dependencies: {
    prisma: IocModulePrisma.injector,
    authMiddleware: IocModuleAuthMiddlewares.injector,
  },
  factory: async ({ dependencies }) => {
    const { prisma, authMiddleware } = dependencies;

    const crudService: BooksCRUDServiceContract = new BooksCRUDService(prisma);
    const router: LibsExpress.ExpressAppRouter = booksCRUDRouter(crudService, {
      authRequired: authMiddleware.authMiddleware,
    });

    return { router };
  },
});
