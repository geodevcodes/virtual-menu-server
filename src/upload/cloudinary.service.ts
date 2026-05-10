import { Injectable, Logger } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  public async uploadFile(
    file: any,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    this.logger.log('Uploading file to cloudinary');
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        if (!result)
          return reject(
            new Error('Cloudinary upload failed: no result returned'),
          );
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
