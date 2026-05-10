import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'bson';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  private validateObjectId(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid menu ID format');
    }
  }

  private async uploadFileToCloudinary(file?: Express.Multer.File) {
    if (!file) return undefined;

    const uploadedFile = await this.uploadService.uploadToCloudinary(file);

    return uploadedFile.url;
  }

  async create(
    userId: string,
    dto: CreateMenuDto,
    files: {
      foodMenuFile?: Express.Multer.File[];
      drinkMenuFile?: Express.Multer.File[];
      spaMenuFile?: Express.Multer.File[];
      accomodationMenuFile?: Express.Multer.File[];
      accommodationMenuFile?: Express.Multer.File[];
    },
  ) {
    const accommodationFile =
      files.accommodationMenuFile?.[0] || files.accomodationMenuFile?.[0];

    const foodMenuFile = files.foodMenuFile?.[0];
    const drinkMenuFile = files.drinkMenuFile?.[0];
    const spaMenuFile = files.spaMenuFile?.[0];

    if (!foodMenuFile && !drinkMenuFile && !spaMenuFile && !accommodationFile) {
      throw new BadRequestException('At least one menu file is required');
    }

    const [foodMenuUrl, drinkMenuUrl, spaMenuUrl, accommodationMenuUrl] =
      await Promise.all([
        this.uploadFileToCloudinary(foodMenuFile),
        this.uploadFileToCloudinary(drinkMenuFile),
        this.uploadFileToCloudinary(spaMenuFile),
        this.uploadFileToCloudinary(accommodationFile),
      ]);

    return this.prisma.menu.create({
      data: {
        userId,
        name: dto.name,

        foodMenuUrl,
        drinkMenuUrl,
        spaMenuUrl,
        accommodationMenuUrl,

        restaurantReviewUrl: dto.restaurantReviewUrl,
        spaReviewUrl: dto.spaReviewUrl,
        accommodationReviewUrl:
          dto.accommodationReviewUrl || dto.accomodationReviewUrl,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.menu.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    this.validateObjectId(id);

    const menu = await this.prisma.menu.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    return menu;
  }

  async update(userId: string, id: string, dto: UpdateMenuDto) {
    this.validateObjectId(id);

    await this.findOne(userId, id);

    return this.prisma.menu.update({
      where: { id },
      data: {
        name: dto.name,
        restaurantReviewUrl: dto.restaurantReviewUrl,
        spaReviewUrl: dto.spaReviewUrl,
        accommodationReviewUrl:
          dto.accommodationReviewUrl || dto.accomodationReviewUrl,
      },
    });
  }

  async remove(userId: string, id: string) {
    this.validateObjectId(id);

    await this.findOne(userId, id);

    await this.prisma.menu.delete({
      where: { id },
    });
  }
}
