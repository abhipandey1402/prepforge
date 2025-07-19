import nodemailer from 'nodemailer';
import { config } from '../config/env.config.js';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
    replyTo?: string;
}

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.smtpHost,
            port: config.smtpPort,
            auth: {
                user: config.smtpUser,
                pass: config.smtpPass,
            },
        });
    }

    async sendMail({ to, subject, html, from, replyTo }: EmailOptions) {
        const mailOptions = {
            from: from || `"PrepForge" <noreply@prepforge.space>`,
            replyTo: replyTo || `"PrepForge Noreply" <noreply@prepforge.space>`,
            to,
            subject,
            html,
        };

        const info = await this.transporter.sendMail(mailOptions);
        return info;
    }
}

export const emailService = new EmailService();
