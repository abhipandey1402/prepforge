import dotenv from 'dotenv';
dotenv.config();

export const config = {
    smtpHost: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    smtpPort: Number(process.env.BREVO_SMTP_PORT) || 587,
    smtpUser: process.env.BREVO_SMTP_USER || '',
    smtpPass: process.env.BREVO_SMTP_PASS || '',
};
