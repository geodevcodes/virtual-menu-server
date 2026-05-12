import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadToCloudinary(createUploadDto: CreateUploadDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        provider: string;
        url: string;
        mimeType: string;
    }>;
    uploadToS3(createUploadDto: CreateUploadDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        provider: string;
        url: string;
        mimeType: string;
    }>;
    uploadToWeb3Storage(createUploadDto: CreateUploadDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        provider: string;
        url: string;
        mimeType: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        provider: string;
        url: string;
        mimeType: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        provider: string;
        url: string;
        mimeType: string;
    }>;
    update(id: string, updateUploadDto: UpdateUploadDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        provider: string;
        url: string;
        mimeType: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        provider: string;
        url: string;
        mimeType: string;
    }>;
}
