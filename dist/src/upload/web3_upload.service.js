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
var Web3UploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const web3_storage_1 = require("web3.storage");
let Web3UploadService = Web3UploadService_1 = class Web3UploadService {
    configService;
    logger = new common_1.Logger(Web3UploadService_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    makeStorageClient() {
        return new web3_storage_1.Web3Storage({
            token: this.configService.get('WEB3_STORAGE_API_KEY'),
        });
    }
    async fileFromBuffer(file, fileName) {
        const files = [new web3_storage_1.File([file.buffer], fileName)];
        return files;
    }
    async storeFiles(file) {
        const client = this.makeStorageClient();
        const cid = await client.put(file);
        this.logger.log('stored files with cid:', cid);
        return cid;
    }
    async uploadToWeb3Storage(file) {
        const fileName = `${new Date().getTime()}_${file.originalName.replaceAll(' ', '')}`;
        const fileObj = await this.fileFromBuffer(file, fileName);
        const fileCid = await this.storeFiles(fileObj);
        return `https://${fileCid}.ipfs.w3s.link/${fileName}`;
    }
};
exports.Web3UploadService = Web3UploadService;
exports.Web3UploadService = Web3UploadService = Web3UploadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], Web3UploadService);
//# sourceMappingURL=web3_upload.service.js.map