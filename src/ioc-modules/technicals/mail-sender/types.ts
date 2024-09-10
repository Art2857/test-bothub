export type MailSenderServiceContract = {
  sendMail(props: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }): Promise<void>;
};
