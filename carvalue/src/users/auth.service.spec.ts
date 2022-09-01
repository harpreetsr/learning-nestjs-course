import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('HarpreetWP@gmail.com', 'Pass@123');

    expect(user.password).not.toEqual('Pass@123');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    try {
      await service.signup('HarpreetWP@gmail.com', 'Pass@123');
    } catch (err) {
      expect(err.toString()).toMatch('BadRequestException: email in use');
    }
  });

  it('throws if signin is called with an unused email', async () => {
    try {
      await service.signin('HarpreetWP@gmail.com', 'Pass@123');
    } catch (err) {}
  });

  it('throws if an invalid password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { email: 'HarpreetWP@gmail.com', password: 'Pass@123' } as User,
      ]);

    try {
      await service.signin('HSR@email.com', 'Password');
    } catch (err) {
      expect(err.toString()).toMatch('BadRequestException: bad password');
    }
  });

  it('returns a user if correct password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          email: 'HarpreetWP@gmail.com',
          password:
            'db32c24e096cf776.89365bc2d05b796cbfc9e6de1c56c4d0d286b6f99147961dc7b89bb89af9fbd7',
        } as User,
      ]);
    const user = await service.signin('HarpreetWP@gmail.com', 'Pass@123');
    expect(user).toBeDefined();
  });
});
