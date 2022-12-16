import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

const provider = process.env.MAIL_PROVIDER;

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[provider as keyof typeof mailProvider]
);
