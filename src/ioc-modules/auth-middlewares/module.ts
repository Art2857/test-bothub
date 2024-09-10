import depfy from "depfy";

import * as IocModuleJwt from "#ioc-modules/technicals/jwt";
import * as IocModuleRoles from "#ioc-modules/roles";

import { AuthMiddleware } from "./resource.auth.middleware.express";
import { AuthRequiredMiddleware } from "./resource.auth-required.middleware.express";

export default depfy.injectable({
  dependencies: {
    jwt: IocModuleJwt.injector,
    roles: IocModuleRoles.injector,
  },
  factory: async ({ dependencies }) => {
    const { jwt, roles } = dependencies;

    const middlewareAuth = new AuthMiddleware(jwt);
    const middlewareAuthMiddleware = new AuthRequiredMiddleware(roles);

    return {
      auth: middlewareAuth,
      authMiddleware: middlewareAuthMiddleware,
    };
  },
});
