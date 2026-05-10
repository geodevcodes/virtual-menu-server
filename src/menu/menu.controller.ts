import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';
import { PassportJwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { memoryStorage } from 'multer';

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg+xml',
    'application/pdf',
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return callback(
      new Error('Only PDF, JPG, PNG, and SVG files are allowed'),
      false,
    );
  }

  callback(null, true);
};

@ApiTags('Menu')
@ApiBearerAuth()
@UseGuards(PassportJwtAuthGuard)
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create virtual menu' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: MenuEntity })
  @ApiBody({ type: CreateMenuDto })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'foodMenuFile', maxCount: 1 },
        { name: 'drinkMenuFile', maxCount: 1 },
        { name: 'spaMenuFile', maxCount: 1 },
        { name: 'accomodationMenuFile', maxCount: 1 },
        { name: 'accommodationMenuFile', maxCount: 1 },
      ],
      {
        storage: memoryStorage(),
        fileFilter,
        limits: {
          fileSize: 3 * 1024 * 1024,
        },
      },
    ),
  )
  async create(
    @Request() req,
    @Body() dto: CreateMenuDto,
    @UploadedFiles()
    files: {
      foodMenuFile?: Express.Multer.File[];
      drinkMenuFile?: Express.Multer.File[];
      spaMenuFile?: Express.Multer.File[];
      accomodationMenuFile?: Express.Multer.File[];
      accommodationMenuFile?: Express.Multer.File[];
    },
  ) {
    return this.menuService.create(req.user.userId, dto, files);
  }

  @Get()
  @ApiOperation({ summary: 'Get authenticated user menus' })
  @ApiOkResponse({ type: MenuEntity, isArray: true })
  async findAll(@Request() req) {
    return this.menuService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu by ID' })
  @ApiOkResponse({ type: MenuEntity })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.menuService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update menu' })
  @ApiOkResponse({ type: MenuEntity })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateMenuDto,
  ) {
    return this.menuService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete menu' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Request() req, @Param('id') id: string) {
    return this.menuService.remove(req.user.userId, id);
  }
}
