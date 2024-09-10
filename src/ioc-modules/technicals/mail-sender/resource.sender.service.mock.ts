import { MailSenderServiceContract } from "./types";

export class MailSenderServiceMock implements MailSenderServiceContract {
  public constructor(private readonly sender: string) {}

  public async sendMail(props: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }): Promise<void> {
    const messageOptions = {
      to: props.to,
      from: this.sender,
      sender: this.sender,
      subject: props.subject,
      text: props.text,
      html: props.html,
    };

    console.debug("MailSenderServiceContract.sendMail", messageOptions);
  }
}
