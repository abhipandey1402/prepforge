export const verificationTemplate = (verifyUrl: string) => `
  <!DOCTYPE html>
  <html lang="en" style="margin:0;padding:0;">
    <head>
      <meta charset="UTF-8" />
      <title>Verify your PrepForge account</title>
    </head>
    <body style="background-color: #f9fafb; margin:0; padding:2rem; font-family: Arial, sans-serif; color:#111827;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.05);">
        <tr>
          <td style="padding:2rem;">
            <h2 style="color: #0f172a; margin:0 0 1rem;">Welcome to PrepForge 👋</h2>
            <p style="font-size:16px; line-height:1.5; margin:0 0 1rem;">
              Thank you for signing up! We’re excited to help you level up your LeetCode practice smarter, faster, and with AI-powered insights.
            </p>
            <p style="font-size:16px; line-height:1.5; margin:0 0 2rem;">
              Please confirm your email address by clicking the button below:
            </p>
            <table cellspacing="0" cellpadding="0" style="margin:0 auto 2rem;">
              <tr>
                <td align="center" bgcolor="#f97316" style="border-radius:5px;">
                  <a href="${verifyUrl}" target="_blank" style="display:inline-block; padding:12px 24px; font-size:16px; color:#ffffff; background-color:#f97316; border-radius:5px; text-decoration:none; font-weight:bold;">
                    Verify My Account
                  </a>
                </td>
              </tr>
            </table>
            <p style="font-size:14px; line-height:1.5; margin:0 0 1rem; color:#475569;">
              If the button above does not work, copy and paste the following link into your browser:
            </p>
            <p style="font-size:14px; word-break:break-all; color:#1e40af;">
              <a href="${verifyUrl}" target="_blank" style="color:#1e40af;">${verifyUrl}</a>
            </p>
            <p style="font-size:14px; line-height:1.5; margin:2rem 0 0; color:#475569;">
              This link will expire in 24 hours for your security.
            </p>
            <p style="font-size:14px; line-height:1.5; margin:1rem 0 0; color:#475569;">
              If you didn’t create this account, please ignore this email.
            </p>
            <p style="font-size:14px; line-height:1.5; margin:2rem 0 0; color:#0f172a;">
              — The PrepForge Team
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
