import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    createUser(input: CreateUserDto, session: any): Promise<import("./user.entity").User>;
    signin(input: CreateUserDto, session: any): Promise<import("./user.entity").User>;
    whoAmI(session: any): Promise<import("./user.entity").User>;
    findUser(id: string): Promise<import("./user.entity").User>;
    find(email: string): Promise<import("./user.entity").User[]>;
    removeUser(id: string): Promise<import("./user.entity").User>;
    updateUser(id: string, body: UpdateUserDto): Promise<import("./user.entity").User>;
}
