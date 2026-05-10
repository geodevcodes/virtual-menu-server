import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'bson';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private validateObjectId(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        fullName: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserById(id: string) {
    this.validateObjectId(id);

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getUserByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUser(id: string, data: UpdateUserDto) {
    this.validateObjectId(id);

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          email: true,
          fullName: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }

  async getUserByIdWithRefreshToken(id: string) {
    this.validateObjectId(id);

    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        refreshToken: true,
      },
    });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async deleteUser(id: string) {
    this.validateObjectId(id);

    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}
