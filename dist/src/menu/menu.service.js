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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const bson_1 = require("bson");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
let MenuService = class MenuService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    validateObjectId(id) {
        if (!bson_1.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid menu ID format');
        }
    }
    async uploadFileToCloudinary(file) {
        if (!file)
            return undefined;
        const uploadedFile = await this.uploadService.uploadToCloudinary(file);
        return uploadedFile.url;
    }
    async create(userId, dto, files) {
        const accommodationFile = files.accommodationMenuFile?.[0] || files.accomodationMenuFile?.[0];
        const foodMenuFile = files.foodMenuFile?.[0];
        const drinkMenuFile = files.drinkMenuFile?.[0];
        const spaMenuFile = files.spaMenuFile?.[0];
        if (!foodMenuFile && !drinkMenuFile && !spaMenuFile && !accommodationFile) {
            throw new common_1.BadRequestException('At least one menu file is required');
        }
        const [foodMenuUrl, drinkMenuUrl, spaMenuUrl, accommodationMenuUrl] = await Promise.all([
            this.uploadFileToCloudinary(foodMenuFile),
            this.uploadFileToCloudinary(drinkMenuFile),
            this.uploadFileToCloudinary(spaMenuFile),
            this.uploadFileToCloudinary(accommodationFile),
        ]);
        return this.prisma.menu.create({
            data: {
                userId,
                name: dto.name,
                foodMenuUrl,
                drinkMenuUrl,
                spaMenuUrl,
                accommodationMenuUrl,
                restaurantReviewUrl: dto.restaurantReviewUrl,
                spaReviewUrl: dto.spaReviewUrl,
                accommodationReviewUrl: dto.accommodationReviewUrl || dto.accomodationReviewUrl,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.menu.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(userId, id) {
        this.validateObjectId(id);
        const menu = await this.prisma.menu.findFirst({
            where: {
                id,
                userId,
            },
        });
        if (!menu) {
            throw new common_1.NotFoundException('Menu not found');
        }
        return menu;
    }
    async update(userId, id, dto) {
        this.validateObjectId(id);
        await this.findOne(userId, id);
        return this.prisma.menu.update({
            where: { id },
            data: {
                name: dto.name,
                restaurantReviewUrl: dto.restaurantReviewUrl,
                spaReviewUrl: dto.spaReviewUrl,
                accommodationReviewUrl: dto.accommodationReviewUrl || dto.accomodationReviewUrl,
            },
        });
    }
    async remove(userId, id) {
        this.validateObjectId(id);
        await this.findOne(userId, id);
        await this.prisma.menu.delete({
            where: { id },
        });
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], MenuService);
//# sourceMappingURL=menu.service.js.map