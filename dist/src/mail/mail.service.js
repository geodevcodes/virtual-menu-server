"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
const password_reset_link_template_1 = require("./templates/password-reset-link.template");
const email_provider_config_1 = require("../config/email-provider.config");
const signup_otp_template_1 = require("./templates/signup-otp.template");
const RESEND_API_URL = 'https://api.resend.com/emails';
let MailService = MailService_1 = class MailService {
    logger = new common_1.Logger(MailService_1.name);
    async sendSignupOtp(to, otp, name) {
        const env = (0, email_provider_config_1.getEmailConfig)();
        const { subject, html } = (0, signup_otp_template_1.signupOtpEmailContent)(env.appName ?? 'Virtual Menu', otp, name);
        await this.deliver(to, subject, html, env);
    }
    async sendSignupMail(to, name) {
        const env = (0, email_provider_config_1.getEmailConfig)();
        const { subject, html } = (0, signup_otp_template_1.signupEmailContent)(env.appName ?? 'Virtual Menu', name);
        await this.deliver(to, subject, html, env);
    }
    async sendPasswordResetLink(to, resetLink) {
        const env = (0, email_provider_config_1.getEmailConfig)();
        const { subject, html } = (0, password_reset_link_template_1.passwordResetLinkEmailContent)(env.appName ?? 'Virtual Menu', resetLink);
        await this.deliver(to, subject, html, env);
    }
    async deliver(to, subject, html, env) {
        if (!env.emailFrom?.trim()) {
            throw new common_1.ServiceUnavailableException('Email sender is not configured. Set EMAIL_FROM.');
        }
        const from = env.emailFrom.trim();
        if (env.provider === 'smtp') {
            await this.sendSmtp(to, from, subject, html, env);
            return;
        }
        await this.sendResend(to, from, subject, html, env);
    }
    async sendResend(to, from, subject, html, env) {
        if (!env.resendApiKey?.trim()) {
            this.logger.error('RESEND_API_KEY is not set; cannot send email. Configure Resend or switch to SMTP (e.g. Mailtrap).');
            throw new common_1.ServiceUnavailableException('Email is not configured. Set RESEND_API_KEY and EMAIL_FROM, or SMTP_* for development.');
        }
        const res = await fetch(RESEND_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${env.resendApiKey.trim()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from,
                to: [to],
                subject,
                html,
            }),
        });
        if (!res.ok) {
            const text = await res.text();
            this.logger.error(`Resend API error ${res.status}: ${text}`);
            throw new common_1.ServiceUnavailableException('Failed to send email.');
        }
    }
    async sendSmtp(to, from, subject, html, env) {
        if (!env.smtpHost?.trim() ||
            !env.smtpUser?.trim() ||
            !env.smtpPass?.trim()) {
            this.logger.error('SMTP is selected but SMTP_HOST, SMTP_USER, or SMTP_PASS is missing.');
            throw new common_1.ServiceUnavailableException('Email is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and EMAIL_FROM.');
        }
        const transporter = nodemailer.createTransport({
            host: env.smtpHost.trim(),
            port: env.smtpPort ?? 587,
            secure: env.smtpSecure ?? false,
            auth: {
                user: env.smtpUser.trim(),
                pass: env.smtpPass.trim(),
            },
        });
        try {
            await transporter.sendMail({
                from,
                to,
                subject,
                html,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.logger.error(`SMTP send failed: ${message}`);
            throw new common_1.ServiceUnavailableException('Failed to send email.');
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail.service.js.map