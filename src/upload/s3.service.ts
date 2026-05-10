import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

interface FormDataFile {
  buffer: Buffer;
  originalName: string;
  mimetype: string;
}

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly logger = new Logger(S3Service.name);

  constructor(private readonly configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('AWS_S3_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_S3_SECRET_ACCESS_KEY',
    );
    const region = this.configService.get<string>('AWS_S3_REGION');

    if (!accessKeyId || !secretAccessKey || !region) {
      throw new Error(
        'AWS S3 credentials or region are not set in environment variables',
      );
    }

    this.s3Client = new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  async uploadFile(file: FormDataFile, filename?: string): Promise<string> {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!bucketName) throw new Error('AWS_S3_BUCKET_NAME is not defined');

    const originalName = file.originalName || 'file';
    const ext = originalName.split('.').pop();
    const baseName = originalName.replace(`.${ext}`, '').replaceAll(' ', '');
    const fileName = filename
      ? `${filename}${baseName}.${ext}`
      : `${baseName}_${Date.now()}.${ext}`;

    this.logger.log(
      `Uploading file to S3 bucket: ${bucketName}, key: ${fileName}`,
    );

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    await this.s3Client.send(command);

    return `https://${bucketName}.s3.${this.configService.get(
      'AWS_S3_REGION',
    )}.amazonaws.com/${fileName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    if (!fileUrl) throw new Error('fileUrl is required for deletion');

    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!bucketName) throw new Error('AWS_S3_BUCKET_NAME is not defined');

    const key = fileUrl.split('/').pop();
    if (!key) throw new Error('Cannot extract file key from URL');

    this.logger.debug(`Deleting file: ${fileUrl} from S3`);

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }

  async updateFile(
    fileUrl: string,
    file: FormDataFile,
    filename?: string,
  ): Promise<string> {
    if (fileUrl) await this.deleteFile(fileUrl);
    return this.uploadFile(file, filename);
  }
}
