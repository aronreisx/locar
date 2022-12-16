import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../IMailProvider';

export class EtherealMailProvider implements IMailProvider {
  private client!: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((error) => console.error(error));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: unknown,
    path: string
  ): Promise<void> {
    const templateFile = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFile);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: `${process.env.APP_NAME} <noreply@${process.env.APP_DOMAIN}>`,
      subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
