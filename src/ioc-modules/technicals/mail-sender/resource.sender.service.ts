import nodemailer from "nodemailer";

import { MailSenderServiceContract } from "./types";

/// TODO: replace to push task in async queue

export class MailSenderService implements MailSenderServiceContract {
  public constructor(
    private readonly sender: string,
    private readonly nodemailerTransport: nodemailer.Transporter
  ) {}

  public async sendMail(props: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }): Promise<void> {
    await this.nodemailerTransport.sendMail({
      to: props.to,
      from: this.sender,
      sender: this.sender,
      subject: props.subject,
      text: props.text,
      html: props.html,
    });
  }
}
