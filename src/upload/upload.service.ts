import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { UploadInput, UpdateUploadInput } from './dto/create-upload.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Web3UploadService } from './web3_upload.service';
import { CloudinaryService } from './cloudinary.service';
import { S3Service } from './s3.service';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly s3Service: S3Service,
    private readonly web3UploadService: Web3UploadService,
  ) {}

  // ----- Cloudinary -----
  async uploadToCloudinary(file: any) {
    if (!file) throw new BadRequestException('File is required');

    try {
      const result = await this.cloudinaryService.uploadFile(file);

      const uploadInfo: UploadInput = {
        url: result.secure_url || result.url,
        mimeType: file.mimetype,
        provider: 'cloudinary',
      };

      return this.prisma.upload.create({ data: uploadInfo });
    } catch (error: any) {
      this.logger.error('Cloudinary upload failed', error);
      throw new BadRequestException(error.message);
    }
  }

  // ----- S3 -----
  async uploadToS3(file: any) {
    if (!file) throw new BadRequestException('File is required');

    try {
      const url = await this.s3Service.uploadFile(file);

      const uploadInfo: UploadInput = {
        url,
        mimeType: file.mimetype,
        provider: 's3',
      };

      return this.prisma.upload.create({ data: uploadInfo });
    } catch (error: any) {
      this.logger.error('S3 upload failed', error);
      throw new BadRequestException(error.message);
    }
  }

  // ----- Web3 / IPFS -----
  async uploadToWeb3Storage(file: any) {
    if (!file) throw new BadRequestException('File is required');

    try {
      const fileName = `${Date.now()}_${file.originalName.replace(/\s+/g, '')}`;
      const fileObj = await this.web3UploadService.fileFromBuffer(
        file,
        fileName,
      );
      const fileCid = await this.web3UploadService.storeFiles(fileObj);

      const fileUrl = `https://${fileCid}.ipfs.w3s.link/${fileName}`;

      const uploadInfo: UploadInput = {
        url: fileUrl,
        mimeType: file.mimetype,
        provider: 'ipfs',
      };

      return this.prisma.upload.create({ data: uploadInfo });
    } catch (error: any) {
      this.logger.error('Web3.Storage upload failed', error);
      throw new BadRequestException(error.message);
    }
  }

  // ----- CRUD -----
  async findAll() {
    return this.prisma.upload.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const upload = await this.prisma.upload.findUnique({ where: { id } });
    if (!upload) throw new NotFoundException(`Upload #${id} not found`);
    return upload;
  }

  async update(id: string, updateInput: UpdateUploadInput) {
    try {
      return await this.prisma.upload.update({
        where: { id },
        data: updateInput,
      });
    } catch (error) {
      throw new NotFoundException(`Upload #${id} not found`);
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.upload.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Upload #${id} not found`);
    }
  }
}
