declare class AuthUser {
    id: string;
    email: string;
}
export declare class AuthEntity {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
}
export declare class MessageEntity {
    message: string;
}
export {};
