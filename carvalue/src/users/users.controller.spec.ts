import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'HarpreetWP@gmail.com',
          password: 'Pass@123',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          {
            id: 1,
            email,
            password: 'Pass@123',
          } as User,
        ]);
      },
      // remove: () => {},
      // update: () => {},
    };

    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('HarpreetWP@gmail.com');

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('HarpreetWP@gmail.com');
  });

  it('findUser return a single user with given id', async () => {
    const user = await controller.findUser('1');

    expect(user).toBeDefined();
  });

  it('findUser throws an error if given id was not found', async () => {
    fakeUsersService.findOne = () => null;

    try {
      await controller.findUser('1');
    } catch (error) {
      expect(error.toString()).toMatch('NotFoundException: user not found');
    }
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -99 };

    const user = await controller.signin(
      {
        email: 'HarpreetWP@gmail.com',
        password: 'Pass@123',
      } as User,
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
