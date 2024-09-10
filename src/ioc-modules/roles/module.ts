import depfy from "depfy";

import * as IocModuleEnv from "#ioc-modules/technicals/env";

import { RolesService } from "./resource.roles.service";
import { RolesServiceContract } from "./types";
import * as Constants from "./constants";

export default depfy.injectable({
  dependencies: {
    env: IocModuleEnv.injector,
  },
  factory: async ({ dependencies }) => {
    const { env } = dependencies;

    const defaultRole = env.IS_DEV ? Constants.ROLE_ADMIN : 0;

    const rolesService: RolesServiceContract = new RolesService(defaultRole);

    return rolesService;
  },
});
