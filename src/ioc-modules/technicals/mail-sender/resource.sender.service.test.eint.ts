import dotenv from "dotenv";
import path from "path";
import nodemailer from "nodemailer";

import { MailSenderService } from "./resource.sender.service";

let env = {} as {
  transporter: {
    host: string;
    port: number;
    auth: {
      user: string;
      pass: string;
    };
  };
  sendTo: string;
};
let mailSenderService: MailSenderService;

beforeAll(() => {
  const envFilepath = path.join(process.cwd(), ".env");
  const envFilepathForTest = path.join(process.cwd(), ".env.test");

  dotenv.config({
    path: envFilepath,
  });
  dotenv.config({
    path: envFilepathForTest,
  });

  const environment = {
    transporter: {
      host: process.env["MAIL_SENDER_HOST"]!,
      port: +process.env["MAIL_SENDER_PORT"]!,
      auth: {
        user: process.env["MAIL_SENDER_USER"]!,
        pass: process.env["MAIL_SENDER_PASS"]!,
      },
    },
    sender: process.env["MAIL_SENDER_SENDER"],
    sendTo: process.env["MAIL_SEND_TO"]!,
  };

  Object.assign(env, environment);

  const transporter = nodemailer.createTransport(environment.transporter);

  mailSenderService = new MailSenderService(
    environment.sender ?? environment.transporter.auth.user,
    transporter
  );
});

describe("Success sends", () => {
  const timestamp = Date.now();

  it("Send HelloWorld: timestamp=" + timestamp, async () => {
    await mailSenderService.sendMail({
      to: env.sendTo,
      subject: "Subject Hello World",
      text: "It is body man version text, timestamp=" + timestamp,
    });

    expect(true).toBe(true);
  });
});
