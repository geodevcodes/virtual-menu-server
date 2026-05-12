"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BooksService = class BooksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllBooks() {
        return this.prisma.book.findMany({
            include: { user: true },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findById(id) {
        const book = await this.prisma.book.findUnique({
            where: { id },
            include: { user: true },
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with id ${id} not found`);
        }
        return book;
    }
    async findByTitle(title) {
        const book = await this.prisma.book.findFirst({
            where: { title },
            include: { user: true },
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with title "${title}" not found`);
        }
        return book;
    }
    async create(data) {
        return this.prisma.book.create({
            data,
        });
    }
    async update(bookId, data) {
        try {
            return await this.prisma.book.update({
                where: { id: bookId },
                data,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Book with id ${bookId} not found`);
        }
    }
    async delete(bookId) {
        try {
            await this.prisma.book.delete({
                where: { id: bookId },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Book with id ${bookId} not found`);
        }
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksService);
//# sourceMappingURL=books.service.js.map