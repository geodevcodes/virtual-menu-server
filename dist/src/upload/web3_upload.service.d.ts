import { ConfigService } from '@nestjs/config';
export declare class Web3UploadService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    makeStorageClient(): any;
    fileFromBuffer(file: any, fileName: string): Promise<any[]>;
    storeFiles(file: any): Promise<any>;
    uploadToWeb3Storage(file: any): Promise<string>;
}
