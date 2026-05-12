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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
const search_book_dto_1 = require("./dto/search-book.dto");
const book_entity_1 = require("./entities/book.entity");
const books_service_1 = require("./books.service");
const swagger_1 = require("@nestjs/swagger");
const passport_jwt_guard_1 = require("../auth/guards/passport-jwt.guard");
let BooksController = class BooksController {
    booksService;
    constructor(booksService) {
        this.booksService = booksService;
    }
    async getAllBooks() {
        return this.booksService.getAllBooks();
    }
    async getBookByTitle(query) {
        return this.booksService.findByTitle(query.title);
    }
    async getBookById(id) {
        return this.booksService.findById(id);
    }
    async addBook(book) {
        const bookData = book;
        return this.booksService.create(bookData);
    }
    async updateBook(id, book) {
        const updatedBookData = book;
        return this.booksService.update(id, updatedBookData);
    }
    async deleteBook(id) {
        return this.booksService.delete(id);
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all books' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of all books',
        type: book_entity_1.BookEntity,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search book by title' }),
    (0, swagger_1.ApiQuery)({ name: 'title', required: true }),
    (0, swagger_1.ApiOkResponse)({ type: book_entity_1.BookEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Book not found' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_book_dto_1.SearchBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBookByTitle", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a book by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Book UUID' }),
    (0, swagger_1.ApiOkResponse)({ type: book_entity_1.BookEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Book not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getBookById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new book' }),
    (0, swagger_1.ApiCreatedResponse)({ type: book_entity_1.BookEntity }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "addBook", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a book' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Book UUID' }),
    (0, swagger_1.ApiOkResponse)({ type: book_entity_1.BookEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Book not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a book' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Book UUID' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Book deleted successfully' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Book not found' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "deleteBook", null);
exports.BooksController = BooksController = __decorate([
    (0, swagger_1.ApiTags)('Books'),
    (0, common_1.UseGuards)(passport_jwt_guard_1.PassportJwtAuthGuard),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map