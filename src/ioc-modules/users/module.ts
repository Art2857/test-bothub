import depfy from "depfy";

import * as LibsExpress from "#libs/express";
import * as IocModulePrisma from "#ioc-modules/technicals/prisma";
import * as IocModuleRoles from "#ioc-modules/roles";
import * as IocModuleAuthMiddlewares from "#ioc-modules/auth-middlewares";

import { UserCRUDService } from "./resource.crud.server";
import { UserCRUDServiceContract } from "./types";
import { userCRUDRouter } from "./resource.controller.express";

export default depfy.injectable({
  dependencies: {
    prisma: IocModulePrisma.injector,
    roles: IocModuleRoles.injector,
    authMiddleware: IocModuleAuthMiddlewares.injector,
  },
  factory: async ({ dependencies }) => {
    const { prisma, roles, authMiddleware } = dependencies;

    const crudService: UserCRUDServiceContract = new UserCRUDService(
      prisma,
      roles
    );
    const router: LibsExpress.ExpressAppRouter = userCRUDRouter(crudService, {
      authRequired: authMiddleware.authMiddleware,
    });

    return { router, crudService };
  },
});
