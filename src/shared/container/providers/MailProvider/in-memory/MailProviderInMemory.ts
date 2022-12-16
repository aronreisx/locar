import { IMailProvider } from '../IMailProvider';

export class MailProviderInMemory implements IMailProvider {
  private message: unknown[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: unknown,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
