import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(input: CreateUserDto): void;
    findUser(id: string): Promise<import("./user.entity").User>;
    find(email: string): Promise<import("./user.entity").User[]>;
}
