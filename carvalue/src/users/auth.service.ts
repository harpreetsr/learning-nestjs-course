import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { generate } from 'rxjs';

const script = promisify(_script);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const userExists = await this.userService.find(email);

    if (userExists.length) {
      throw new BadRequestException('Email already in use!');
    }

    // Hash the user password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and password together
    const hash = (await script(password, salt, 32)) as Buffer;

    // Joined the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.userService.create(email, result);

    // Return the user
    return user;
  }
}
