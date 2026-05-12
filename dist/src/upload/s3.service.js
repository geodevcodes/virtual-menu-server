"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var S3Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
let S3Service = S3Service_1 = class S3Service {
    configService;
    s3Client;
    logger = new common_1.Logger(S3Service_1.name);
    constructor(configService) {
        this.configService = configService;
        const accessKeyId = this.configService.get('AWS_S3_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get('AWS_S3_SECRET_ACCESS_KEY');
        const region = this.configService.get('AWS_S3_REGION');
        if (!accessKeyId || !secretAccessKey || !region) {
            throw new Error('AWS S3 credentials or region are not set in environment variables');
        }
        this.s3Client = new client_s3_1.S3Client({
            region,
            credentials: { accessKeyId, secretAccessKey },
        });
    }
    async uploadFile(file, filename) {
        const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
        if (!bucketName)
            throw new Error('AWS_S3_BUCKET_NAME is not defined');
        const originalName = file.originalName || 'file';
        const ext = originalName.split('.').pop();
        const baseName = originalName.replace(`.${ext}`, '').replaceAll(' ', '');
        const fileName = filename
            ? `${filename}${baseName}.${ext}`
            : `${baseName}_${Date.now()}.${ext}`;
        this.logger.log(`Uploading file to S3 bucket: ${bucketName}, key: ${fileName}`);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        });
        await this.s3Client.send(command);
        return `https://${bucketName}.s3.${this.configService.get('AWS_S3_REGION')}.amazonaws.com/${fileName}`;
    }
    async deleteFile(fileUrl) {
        if (!fileUrl)
            throw new Error('fileUrl is required for deletion');
        const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
        if (!bucketName)
            throw new Error('AWS_S3_BUCKET_NAME is not defined');
        const key = fileUrl.split('/').pop();
        if (!key)
            throw new Error('Cannot extract file key from URL');
        this.logger.debug(`Deleting file: ${fileUrl} from S3`);
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        await this.s3Client.send(command);
    }
    async updateFile(fileUrl, file, filename) {
        if (fileUrl)
            await this.deleteFile(fileUrl);
        return this.uploadFile(file, filename);
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = S3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=s3.service.js.map