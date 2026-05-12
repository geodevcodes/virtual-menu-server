import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from '@/prisma/prisma.service';
export declare class BooksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllBooks(): Promise<({
        user: {
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
        } | null;
    } & {
        title: string;
        userId: string;
        author: string;
        publicationYear: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findById(id: string): Promise<{
        user: {
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
        } | null;
    } & {
        title: string;
        userId: string;
        author: string;
        publicationYear: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByTitle(title: string): Promise<{
        user: {
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
        } | null;
    } & {
        title: string;
        userId: string;
        author: string;
        publicationYear: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: CreateBookDto): Promise<{
        title: string;
        userId: string;
        author: string;
        publicationYear: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(bookId: string, data: UpdateBookDto): Promise<{
        title: string;
        userId: string;
        author: string;
        publicationYear: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(bookId: string): Promise<void>;
}
