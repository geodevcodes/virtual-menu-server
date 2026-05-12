import { ConfigService } from '@nestjs/config';
interface FormDataFile {
    buffer: Buffer;
    originalName: string;
    mimetype: string;
}
export declare class S3Service {
    private readonly configService;
    private readonly s3Client;
    private readonly logger;
    constructor(configService: ConfigService);
    uploadFile(file: FormDataFile, filename?: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
    updateFile(fileUrl: string, file: FormDataFile, filename?: string): Promise<string>;
}
export {};
