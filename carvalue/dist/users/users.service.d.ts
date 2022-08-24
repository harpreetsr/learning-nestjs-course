import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(input: CreateUserDto): Promise<User>;
}
