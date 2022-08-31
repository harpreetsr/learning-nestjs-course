import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

it('Can create an instance of auth service', async () => {
  // Create a fake copy of users service
  const fakeUserService: Partial<UsersService> = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User),
  };

  let authService: AuthService;
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: UsersService, useValue: fakeUserService },
    ],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
