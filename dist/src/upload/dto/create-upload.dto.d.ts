export declare class CreateUploadDto {
    file?: any;
}
export declare class UploadInput {
    url: string;
    mimeType: string;
    provider: string;
}
declare const UpdateUploadInput_base: import("@nestjs/common").Type<Partial<UploadInput>>;
export declare class UpdateUploadInput extends UpdateUploadInput_base {
}
export {};
