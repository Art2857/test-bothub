import depfy from "depfy";

import * as IocModuleEnv from "#ioc-modules/technicals/env";
import * as IocModuleExpressApp from "#ioc-modules/technicals/express-app";

export const injectorEnv = depfy.injectable({
  dependencies: {
    env: IocModuleEnv.injector,
  },
});

export const injectorApp = depfy.injectable({
  dependencies: {
    expressApp: IocModuleExpressApp.injector,
  },
});
