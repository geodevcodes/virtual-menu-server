"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerifyEmailTemplate = generateVerifyEmailTemplate;
function generateVerifyEmailTemplate(userName, verificationLink) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Invite</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 40px 20px;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      padding: 40px 20px 20px;
    }
    .logo {
      width: 40px;
      height: 40px;
      margin-bottom: 8px;
    }
    .brand-name {
      font-size: 24px;
      font-weight: 600;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .email-body {
      padding: 20px 40px 40px;
      text-align: center;
    }
    .email-title {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 16px;
    }
    .email-content {
      font-size: 14px;
      color: #666666;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    .email-link {
      font-size: 13px;
      color: #999999;
      word-break: break-all;
      margin-bottom: 24px;
      display: block;
    }
    .email-button {
      display: inline-block;
      background-color: #6B46C1;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 32px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 32px;
      transition: background-color 0.2s;
    }
    .email-button:hover {
      background-color: #5a3ba8;
    }
    .email-footer {
      font-size: 12px;
      color: #999999;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .email-footer a {
      color: #6B46C1;
      text-decoration: none;
    }
    .company-address {
      font-size: 12px;
      color: #999999;
      margin-bottom: 20px;
    }
    .social-links {
      display: flex;
      justify-content: center;
      gap: 16px;
      padding-bottom: 20px;
    }
    .social-icon {
      width: 24px;
      height: 24px;
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <div class="brand-name">
        <img src="https://res.cloudinary.com/dlyb5lech/image/upload/v1776167277/brandlogo_fdzsgg.jpg" alt="Virtual Menu Logo" class="logo" />
      </div>
    </div>
    <div class="email-body">
      <h1 class="email-title">Email Invite</h1>
      <p class="email-content">Hi ${userName},<br>Click the link below or the button below to verify your email.</p>
      <span class="email-link">Link: ${verificationLink}</span>
      <a href="${verificationLink}" class="email-button">Verify Email</a>
      <p class="email-footer">
        This email was sent from <a href="mailto:support@geodevcodes.dev">support@geodevcodes.dev</a>. If you rather not receive this kind of emails, you can <a href="#">unsubscribe</a> or manage your <a href="#">email preferences</a>.
      </p>
      <p class="company-address">
        Simpool, 313 Magodo Brooks Estate, Lagos, Nigeria
      </p>
      <div class="social-links">
        <a href="#" class="social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#6B46C1"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
        </a>
        <a href="#" class="social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#6B46C1"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="#" class="social-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#6B46C1"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
//# sourceMappingURL=verify-email.template.js.map