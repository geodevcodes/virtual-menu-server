import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import { BookEntity } from './entities/book.entity';
import { BooksService } from './books.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PassportJwtAuthGuard } from '@/auth/guards/passport-jwt.guard';

@ApiTags('Books')
@UseGuards(PassportJwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({
    description: 'List of all books',
    type: BookEntity,
    isArray: true,
  })
  async getAllBooks(): Promise<BookEntity[]> {
    return this.booksService.getAllBooks();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search book by title' })
  @ApiQuery({ name: 'title', required: true })
  @ApiOkResponse({ type: BookEntity })
  @ApiNotFoundResponse({ description: 'Book not found' })
  async getBookByTitle(@Query() query: SearchBookDto): Promise<BookEntity> {
    return this.booksService.findByTitle(query.title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', description: 'Book UUID' })
  @ApiOkResponse({ type: BookEntity })
  @ApiNotFoundResponse({ description: 'Book not found' })
  async getBookById(@Param('id') id: string): Promise<BookEntity> {
    return this.booksService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiCreatedResponse({ type: BookEntity })
  @HttpCode(HttpStatus.CREATED)
  async addBook(@Body() book: CreateBookDto): Promise<BookEntity> {
    const bookData = book;
    return this.booksService.create(bookData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiParam({ name: 'id', description: 'Book UUID' })
  @ApiOkResponse({ type: BookEntity })
  @ApiNotFoundResponse({ description: 'Book not found' })
  async updateBook(
    @Param('id') id: string,
    @Body()
    book: UpdateBookDto,
  ): Promise<BookEntity> {
    const updatedBookData = book;
    return this.booksService.update(id, updatedBookData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({ name: 'id', description: 'Book UUID' })
  @ApiNoContentResponse({ description: 'Book deleted successfully' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.delete(id);
  }
}
