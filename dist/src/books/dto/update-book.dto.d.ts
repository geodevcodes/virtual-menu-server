import { CreateBookDto } from './create-book.dto';
declare const UpdateBookDto_base: import("@nestjs/common").Type<Partial<CreateBookDto>>;
export declare class UpdateBookDto extends UpdateBookDto_base {
    title?: string;
    author?: string;
    publicationYear?: number;
}
export {};
