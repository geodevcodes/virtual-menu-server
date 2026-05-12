import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private validateObjectId;
    getAllUsers(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullName: string;
        isEmailVerified: boolean;
    }[]>;
    getUserById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullName: string;
        isEmailVerified: boolean;
    }>;
    getUserByEmailWithPassword(email: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string | null;
        fullName: string;
        avatar: string | null;
        provider: import("@prisma/client").$Enums.AuthProvider;
        providerId: string | null;
        isEmailVerified: boolean;
        refreshToken: string | null;
    } | null>;
    createUser(data: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullName: string;
    }>;
    updateUser(id: string, data: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullName: string;
    }>;
    getUserByIdWithRefreshToken(id: string): Promise<{
        id: string;
        email: string;
        refreshToken: string | null;
    } | null>;
    updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
