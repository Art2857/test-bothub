import depfy from "depfy";

import * as LibsExpress from "#libs/express";
import * as IocModuleEnv from "#ioc-modules/technicals/env";
import * as IocModuleJwt from "#ioc-modules/technicals/jwt";
import * as IocModuleCrypto from "#ioc-modules/technicals/crypto";
import * as IocModuleHasher from "#ioc-modules/technicals/hasher";
import * as IocModuleMailSender from "#ioc-modules/technicals/mail-sender";

import * as IocModuleUser from "#ioc-modules/users";

import { AuthServiceContract } from "./types";

import { AuthService } from "./resource.auth.service";
import { AuthRouter } from "./resource.controller.express";

export default depfy.injectable({
  dependencies: {
    env: IocModuleEnv.injector,
    jwt: IocModuleJwt.injector,
    mailSender: IocModuleMailSender.injector,
    hasher: IocModuleHasher.injector,
    crypto: IocModuleCrypto.injector,
    user: IocModuleUser.injector,
  },
  factory: async ({ dependencies }) => {
    const { env, jwt, mailSender, hasher, crypto, user } = dependencies;

    const authService: AuthServiceContract = new AuthService(
      /** this is get endpoint, but maybe replace on to get page, which automatically call post request */
      /// TODO: replace on post request
      `${env.URL_SERVER_API}users/register-verify`,
      jwt,
      mailSender,
      hasher,
      crypto,
      user.crudService
    );
    const router: LibsExpress.ExpressAppRouter = AuthRouter(authService);

    return {
      router,
    };
  },
});
