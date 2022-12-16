import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { AppError } from '@errors/AppErrors';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';

@injectable()
export class SendForgottenPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: DayjsDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

    if (!user) throw new AppError('User does not exists!');

    const token = uuidv4();

    const expiring_date = this.dateProvider.addHours(3);

    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expiring_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.RESET_PASSWORD_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Password resetting',
      variables,
      templatePath
    );
  }
}
