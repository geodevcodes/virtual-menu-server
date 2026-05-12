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
exports.UpdateUploadInput = exports.UploadInput = exports.CreateUploadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const nestjs_form_data_1 = require("nestjs-form-data");
class CreateUploadDto {
    file;
}
exports.CreateUploadDto = CreateUploadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    (0, nestjs_form_data_1.IsFile)(),
    (0, nestjs_form_data_1.MaxFileSize)(2.1e6),
    (0, nestjs_form_data_1.HasMimeType)([
        'image/png',
        'image/jpeg',
        'application/pdf',
        'text/csv',
        'application/x-cfb',
        'application/msword',
        'application/vnd.oasis.opendocument.spreadsheet',
        'application/vnd.oasis.opendocument.text',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]),
    __metadata("design:type", Object)
], CreateUploadDto.prototype, "file", void 0);
class UploadInput {
    url;
    mimeType;
    provider;
}
exports.UploadInput = UploadInput;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], UploadInput.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], UploadInput.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    __metadata("design:type", String)
], UploadInput.prototype, "provider", void 0);
class UpdateUploadInput extends (0, swagger_1.PartialType)(UploadInput) {
}
exports.UpdateUploadInput = UpdateUploadInput;
//# sourceMappingURL=create-upload.dto.js.map