import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { Web3UploadService } from './web3_upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryService } from './cloudinary.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UploadService } from './upload.service';
import { S3Service } from './s3.service';

@Module({
  imports: [NestjsFormDataModule],
  controllers: [UploadController],
  providers: [
    UploadService,
    Web3UploadService,
    CloudinaryService,
    CloudinaryProvider,
    S3Service,
  ],
  exports: [UploadService],
})
export class UploadModule {}
