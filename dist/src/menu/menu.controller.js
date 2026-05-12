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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const menu_service_1 = require("./menu.service");
const create_menu_dto_1 = require("./dto/create-menu.dto");
const update_menu_dto_1 = require("./dto/update-menu.dto");
const menu_entity_1 = require("./entities/menu.entity");
const passport_jwt_guard_1 = require("../auth/guards/passport-jwt.guard");
const multer_1 = require("multer");
const fileFilter = (_req, file, callback) => {
    const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/svg+xml',
        'application/pdf',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
        return callback(new Error('Only PDF, JPG, PNG, and SVG files are allowed'), false);
    }
    callback(null, true);
};
let MenuController = class MenuController {
    menuService;
    constructor(menuService) {
        this.menuService = menuService;
    }
    async create(req, dto, files) {
        return this.menuService.create(req.user.userId, dto, files);
    }
    async findAll(req) {
        return this.menuService.findAll(req.user.userId);
    }
    async findOne(req, id) {
        return this.menuService.findOne(req.user.userId, id);
    }
    async update(req, id, dto) {
        return this.menuService.update(req.user.userId, id, dto);
    }
    async remove(req, id) {
        return this.menuService.remove(req.user.userId, id);
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create virtual menu' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiCreatedResponse)({ type: menu_entity_1.MenuEntity }),
    (0, swagger_1.ApiBody)({ type: create_menu_dto_1.CreateMenuDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'foodMenuFile', maxCount: 1 },
        { name: 'drinkMenuFile', maxCount: 1 },
        { name: 'spaMenuFile', maxCount: 1 },
        { name: 'accomodationMenuFile', maxCount: 1 },
        { name: 'accommodationMenuFile', maxCount: 1 },
    ], {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter,
        limits: {
            fileSize: 3 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_menu_dto_1.CreateMenuDto, Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get authenticated user menus' }),
    (0, swagger_1.ApiOkResponse)({ type: menu_entity_1.MenuEntity, isArray: true }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get menu by ID' }),
    (0, swagger_1.ApiOkResponse)({ type: menu_entity_1.MenuEntity }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update menu' }),
    (0, swagger_1.ApiOkResponse)({ type: menu_entity_1.MenuEntity }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_menu_dto_1.UpdateMenuDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete menu' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "remove", null);
exports.MenuController = MenuController = __decorate([
    (0, swagger_1.ApiTags)('Menu'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(passport_jwt_guard_1.PassportJwtAuthGuard),
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map