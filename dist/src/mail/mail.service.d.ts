export declare class MailService {
    private readonly logger;
    sendSignupOtp(to: string, otp: string, name: string): Promise<void>;
    sendSignupMail(to: string, name: string): Promise<void>;
    sendPasswordResetLink(to: string, resetLink: string): Promise<void>;
    private deliver;
    private sendResend;
    private sendSmtp;
}
