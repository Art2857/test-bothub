import depfy from "depfy";
import nodemailer from "nodemailer";

import * as IocModuleEnv from "#ioc-modules/technicals/env";

import { MailSenderService } from "./resource.sender.service";
import { MailSenderServiceContract } from "./types";

export default depfy.injectable({
  dependencies: {
    env: IocModuleEnv.injector,
  },
  factory: async ({ dependencies }) => {
    const { env } = dependencies;

    const transporter = nodemailer.createTransport({
      host: env.MAIL_SENDER_HOST,
      port: env.MAIL_SENDER_PORT,
      auth: {
        user: env.MAIL_SENDER_USER,
        pass: env.MAIL_SENDER_PASS,
      },
      dnsTimeout: 5_000,
      socketTimeout: 5_000,
      greetingTimeout: 5_000,
      connectionTimeout: 5_000,
    });

    const mailSender: MailSenderServiceContract = new MailSenderService(
      env.MAIL_SENDER_SENDER ?? env.MAIL_SENDER_USER,
      transporter
    );

    return mailSender;
  },
});
