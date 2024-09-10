import depfy from "depfy";

import * as IocModuleApp from "./app";

import { buildedListMocks } from "./mocks";

const APP_PORT = 3033;

async function main() {
  const { root: env } = await depfy.resolver({
    dependency: IocModuleApp.injectorEnv,
  });

  const { root: app } = await depfy.resolver({
    dependency: IocModuleApp.injectorApp,
    replacements: env.env.IS_DEV ? buildedListMocks() : [],
  });

  console.debug("Application started with environment", env.env);

  app.expressApp.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`);
  });
}

main();
