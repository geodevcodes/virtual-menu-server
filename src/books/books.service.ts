import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBooks() {
    return this.prisma.book.findMany({
      include: { user: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  async findByTitle(title: string) {
    const book = await this.prisma.book.findFirst({
      where: { title },
      include: { user: true },
    });

    if (!book) {
      throw new NotFoundException(`Book with title "${title}" not found`);
    }

    return book;
  }

  async create(data: CreateBookDto) {
    return this.prisma.book.create({
      data,
    });
  }

  async update(bookId: string, data: UpdateBookDto) {
    try {
      return await this.prisma.book.update({
        where: { id: bookId },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
  }

  async delete(bookId: string) {
    try {
      await this.prisma.book.delete({
        where: { id: bookId },
      });
    } catch (error) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
  }
}
