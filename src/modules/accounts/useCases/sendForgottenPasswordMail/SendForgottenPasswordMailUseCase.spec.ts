import { AppError } from '@errors/AppErrors';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';

import { SendForgottenPasswordMailUseCase } from './SendForgottenPasswordMailUseCase';

describe('Send Forgotten Password Mail', () => {
  let sendForgottenPasswordMailUseCase: SendForgottenPasswordMailUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
  let dateProvider: IDateProvider;
  let mailProvider: MailProviderInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgottenPasswordMailUseCase = new SendForgottenPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '728338',
      email: 'Boyd.Lynch62@gmail.com',
      name: 'Erwin',
      password: '123456',
    });

    await sendForgottenPasswordMailUseCase.execute('Boyd.Lynch62@gmail.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgottenPasswordMailUseCase.execute('Modesta.Beatty@hotmail.com')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateMailToken = spyOn(userTokensRepositoryInMemory, 'create');

    usersRepositoryInMemory.create({
      driver_license: '387286',
      email: 'Stanley.Harvey90@hotmail.com',
      name: 'Reece',
      password: '34123',
    });

    await sendForgottenPasswordMailUseCase.execute(
      'Stanley.Harvey90@hotmail.com'
    );

    expect(generateMailToken).toBeCalled();
  });
});
