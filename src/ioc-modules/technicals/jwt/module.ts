import depfy from "depfy";

import * as IocModuleEnv from "#ioc-modules/technicals/env";

import { JWTService } from "./resource.jwt.service";
import { JWTServiceContract } from "./types";

export default depfy.injectable({
  dependencies: {
    env: IocModuleEnv.injector,
  },
  factory: async ({ dependencies }) => {
    const { env } = dependencies;

    const jwt: JWTServiceContract = new JWTService(
      env.JWT_SECRET_KEY,
      env.JWT_EXPIRES_IN
    );

    return jwt;
  },
});
