import depfy from "depfy";

import * as IocModuleEnv from "#ioc-modules/technicals/env";

import { HasherService } from "./resource.hasher.service";
import { HasherServiceContract } from "./types";

export default depfy.injectable({
  dependencies: {
    env: IocModuleEnv.injector,
  },
  factory: async ({ dependencies }) => {
    const { env } = dependencies;

    const hasher: HasherServiceContract = new HasherService(env.HASHER_SALT);

    return hasher;
  },
});
