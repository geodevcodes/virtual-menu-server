export type EmailProviderMode = 'resend' | 'smtp';
export declare function getEmailConfig(): {
    provider: EmailProviderMode;
    resendApiKey: string | undefined;
    emailFrom: string | undefined;
    appName: string;
    smtpHost: string | undefined;
    smtpUser: string | undefined;
    smtpPass: string | undefined;
    smtpSecure: boolean;
    smtpPort: number | undefined;
};
export type EmailConfig = ReturnType<typeof getEmailConfig>;
