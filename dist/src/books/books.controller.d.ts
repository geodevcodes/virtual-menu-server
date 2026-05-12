import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import { BookEntity } from './entities/book.entity';
import { BooksService } from './books.service';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    getAllBooks(): Promise<BookEntity[]>;
    getBookByTitle(query: SearchBookDto): Promise<BookEntity>;
    getBookById(id: string): Promise<BookEntity>;
    addBook(book: CreateBookDto): Promise<BookEntity>;
    updateBook(id: string, book: UpdateBookDto): Promise<BookEntity>;
    deleteBook(id: string): Promise<void>;
}
