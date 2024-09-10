import depfy from "depfy";

import * as IocModuleEnv from "#ioc-modules/technicals/env";

import { CryptoService } from "./resource.crypto.service";
import { CryptoServiceContract } from "./types";

export default depfy.injectable({
  dependencies: {
    env: IocModuleEnv.injector,
  },
  factory: async ({ dependencies }) => {
    const { env } = dependencies;

    const hasher: CryptoServiceContract = new CryptoService(env.CRYPTO_SECRET);

    return hasher;
  },
});
