import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<UserEntity[]>;
    getUserById(id: string): Promise<UserEntity>;
    createUser(dto: CreateUserDto): Promise<UserEntity>;
    updateUser(id: string, dto: UpdateUserDto): Promise<UserEntity>;
    deleteUser(id: string): Promise<void>;
}
