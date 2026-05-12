import { UpdateUploadInput } from './dto/create-upload.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Web3UploadService } from './web3_upload.service';
import { CloudinaryService } from './cloudinary.service';
import { S3Service } from './s3.service';
export declare class UploadService {
    private readonly prisma;
    private readonly cloudinaryService;
    private readonly s3Service;
    private readonly web3UploadService;
    private readonly logger;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService, s3Service: S3Service, web3UploadService: Web3UploadService);
    uploadToCloudinary(file: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        provider: string;
        url: string;
        mimeType: string;
    }>;
    uploadToS3(file: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        provider: string;
        url: string;
        mimeType: string;
    }>;
    uploadToWeb3Storage(file: any): Promise<{
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
    update(id: string, updateInput: UpdateUploadInput): Promise<{
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
