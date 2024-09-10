import depfy from "depfy";

import * as IocModuleEnv from "#ioc-modules/technicals/env";

import module from "./module";

import { MailSenderServiceMock } from "./resource.sender.service.mock";
import { MailSenderServiceContract } from "./types";

export default depfy.replacement({
  replaceable: module,
  dependencies: {
    env: IocModuleEnv.injector,
  },
  factory: async ({ dependencies }) => {
    const { env } = dependencies;

    const mailSender: MailSenderServiceContract = new MailSenderServiceMock(
      env.MAIL_SENDER_SENDER ?? env.MAIL_SENDER_USER
    );

    return mailSender;
  },
});
