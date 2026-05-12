import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    private readonly logger;
    uploadFile(file: any): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
