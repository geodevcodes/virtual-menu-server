"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_provider_1 = require("./providers/cloudinary.provider");
const web3_upload_service_1 = require("./web3_upload.service");
const upload_controller_1 = require("./upload.controller");
const cloudinary_service_1 = require("./cloudinary.service");
const nestjs_form_data_1 = require("nestjs-form-data");
const upload_service_1 = require("./upload.service");
const s3_service_1 = require("./s3.service");
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_form_data_1.NestjsFormDataModule],
        controllers: [upload_controller_1.UploadController],
        providers: [
            upload_service_1.UploadService,
            web3_upload_service_1.Web3UploadService,
            cloudinary_service_1.CloudinaryService,
            cloudinary_provider_1.CloudinaryProvider,
            s3_service_1.S3Service,
        ],
        exports: [upload_service_1.UploadService],
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map