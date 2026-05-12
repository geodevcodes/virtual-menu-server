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
var UploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const web3_upload_service_1 = require("./web3_upload.service");
const cloudinary_service_1 = require("./cloudinary.service");
const s3_service_1 = require("./s3.service");
let UploadService = UploadService_1 = class UploadService {
    prisma;
    cloudinaryService;
    s3Service;
    web3UploadService;
    logger = new common_1.Logger(UploadService_1.name);
    constructor(prisma, cloudinaryService, s3Service, web3UploadService) {
        this.prisma = prisma;
        this.cloudinaryService = cloudinaryService;
        this.s3Service = s3Service;
        this.web3UploadService = web3UploadService;
    }
    async uploadToCloudinary(file) {
        if (!file)
            throw new common_1.BadRequestException('File is required');
        try {
            const result = await this.cloudinaryService.uploadFile(file);
            const uploadInfo = {
                url: result.secure_url || result.url,
                mimeType: file.mimetype,
                provider: 'cloudinary',
            };
            return this.prisma.upload.create({ data: uploadInfo });
        }
        catch (error) {
            this.logger.error('Cloudinary upload failed', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async uploadToS3(file) {
        if (!file)
            throw new common_1.BadRequestException('File is required');
        try {
            const url = await this.s3Service.uploadFile(file);
            const uploadInfo = {
                url,
                mimeType: file.mimetype,
                provider: 's3',
            };
            return this.prisma.upload.create({ data: uploadInfo });
        }
        catch (error) {
            this.logger.error('S3 upload failed', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async uploadToWeb3Storage(file) {
        if (!file)
            throw new common_1.BadRequestException('File is required');
        try {
            const fileName = `${Date.now()}_${file.originalName.replace(/\s+/g, '')}`;
            const fileObj = await this.web3UploadService.fileFromBuffer(file, fileName);
            const fileCid = await this.web3UploadService.storeFiles(fileObj);
            const fileUrl = `https://${fileCid}.ipfs.w3s.link/${fileName}`;
            const uploadInfo = {
                url: fileUrl,
                mimeType: file.mimetype,
                provider: 'ipfs',
            };
            return this.prisma.upload.create({ data: uploadInfo });
        }
        catch (error) {
            this.logger.error('Web3.Storage upload failed', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll() {
        return this.prisma.upload.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const upload = await this.prisma.upload.findUnique({ where: { id } });
        if (!upload)
            throw new common_1.NotFoundException(`Upload #${id} not found`);
        return upload;
    }
    async update(id, updateInput) {
        try {
            return await this.prisma.upload.update({
                where: { id },
                data: updateInput,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Upload #${id} not found`);
        }
    }
    async delete(id) {
        try {
            return await this.prisma.upload.delete({ where: { id } });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Upload #${id} not found`);
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = UploadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService,
        s3_service_1.S3Service,
        web3_upload_service_1.Web3UploadService])
], UploadService);
//# sourceMappingURL=upload.service.js.map