export type EmailProviderMode = 'resend' | 'smtp';

function resolveEmailProvider(): EmailProviderMode {
  const provider = process.env.EMAIL_PROVIDER?.trim().toLowerCase();
  if (provider === 'smtp' || provider === 'mailtrap') {
    return 'smtp';
  }
  return 'resend';
}

export function getEmailConfig() {
  const portRaw = process.env.SMTP_PORT?.trim();

  const smtpPort =
    portRaw && !Number.isNaN(Number(portRaw))
      ? Number.parseInt(portRaw, 10)
      : undefined;

  return {
    provider: resolveEmailProvider(),
    resendApiKey: process.env.RESEND_API_KEY,
    emailFrom: process.env.EMAIL_FROM,
    appName: process.env.EMAIL_APP_NAME || 'Virtual Menu',
    smtpHost: process.env.SMTP_HOST,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    smtpSecure: process.env.SMTP_SECURE?.trim().toLowerCase() === 'true',
    smtpPort,
  };
}

export type EmailConfig = ReturnType<typeof getEmailConfig>;
