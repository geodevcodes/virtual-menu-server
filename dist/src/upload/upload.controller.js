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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_upload_dto_1 = require("./dto/create-upload.dto");
const update_upload_dto_1 = require("./dto/update-upload.dto");
const upload_entity_1 = require("./entities/upload.entity");
const nestjs_form_data_1 = require("nestjs-form-data");
const upload_service_1 = require("./upload.service");
let UploadController = class UploadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    uploadToCloudinary(createUploadDto) {
        return this.uploadService.uploadToCloudinary(createUploadDto.file);
    }
    uploadToS3(createUploadDto) {
        return this.uploadService.uploadToS3(createUploadDto.file);
    }
    uploadToWeb3Storage(createUploadDto) {
        return this.uploadService.uploadToWeb3Storage(createUploadDto.file);
    }
    async findAll() {
        return this.uploadService.findAll();
    }
    async findOne(id) {
        return this.uploadService.findOne(id);
    }
    async update(id, updateUploadDto) {
        return this.uploadService.update(id, updateUploadDto);
    }
    async delete(id) {
        return this.uploadService.delete(id);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('cloudinary'),
    (0, nestjs_form_data_1.FormDataRequest)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload file to Cloudinary' }),
    (0, swagger_1.ApiCreatedResponse)({ type: upload_entity_1.UploadEntity }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Uploaded successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_upload_dto_1.CreateUploadDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadToCloudinary", null);
__decorate([
    (0, common_1.Post)('s3'),
    (0, nestjs_form_data_1.FormDataRequest)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload file to S3' }),
    (0, swagger_1.ApiCreatedResponse)({ type: upload_entity_1.UploadEntity }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Uploaded successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_upload_dto_1.CreateUploadDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadToS3", null);
__decorate([
    (0, common_1.Post)('ipfs'),
    (0, nestjs_form_data_1.FormDataRequest)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload file to Web3 / IPFS' }),
    (0, swagger_1.ApiCreatedResponse)({ type: upload_entity_1.UploadEntity }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Uploaded successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_upload_dto_1.CreateUploadDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadToWeb3Storage", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all files' }),
    (0, swagger_1.ApiOkResponse)({ type: upload_entity_1.UploadEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get file by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'MongoDB ObjectId' }),
    (0, swagger_1.ApiOkResponse)({ type: upload_entity_1.UploadEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'File not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update File' }),
    (0, swagger_1.ApiOkResponse)({ type: upload_entity_1.UploadEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'file not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_upload_dto_1.UpdateUploadDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete file' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'File deleted successfully' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "delete", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map