import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

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

// describe('UsersService', () => {
//   let service: UsersService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UsersService],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
