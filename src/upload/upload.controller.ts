import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UploadEntity } from './entities/upload.entity';
import { FormDataRequest } from 'nestjs-form-data';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('cloudinary')
  @FormDataRequest()
  @ApiOperation({ summary: 'Upload file to Cloudinary' })
  @ApiCreatedResponse({ type: UploadEntity })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ description: 'Uploaded successfully' })
  uploadToCloudinary(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.uploadToCloudinary(createUploadDto.file);
  }

  @Post('s3')
  @FormDataRequest()
  @ApiOperation({ summary: 'Upload file to S3' })
  @ApiCreatedResponse({ type: UploadEntity })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ description: 'Uploaded successfully' })
  uploadToS3(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.uploadToS3(createUploadDto.file);
  }

  @Post('ipfs')
  @FormDataRequest()
  @ApiOperation({ summary: 'Upload file to Web3 / IPFS' })
  @ApiCreatedResponse({ type: UploadEntity })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ description: 'Uploaded successfully' })
  uploadToWeb3Storage(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.uploadToWeb3Storage(createUploadDto.file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all files' })
  @ApiOkResponse({ type: UploadEntity, isArray: true })
  async findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
  @ApiOkResponse({ type: UploadEntity })
  @ApiNotFoundResponse({ description: 'File not found' })
  async findOne(@Param('id') id: string) {
    return this.uploadService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update File' })
  @ApiOkResponse({ type: UploadEntity })
  @ApiNotFoundResponse({ description: 'file not found' })
  async update(
    @Param('id') id: string,
    @Body() updateUploadDto: UpdateUploadDto,
  ) {
    return this.uploadService.update(id, updateUploadDto as any);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete file' })
  @ApiNoContentResponse({ description: 'File deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.uploadService.delete(id);
  }
}
