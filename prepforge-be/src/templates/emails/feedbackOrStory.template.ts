export const feedbackOrStoryTemplate = ({
    formType,
    name,
    contact,
    message,
    email,
    linkedinId,
}: {
    formType: 'Feedback' | 'Success Story';
    name: string;
    contact: string;
    message: string;
    email?: string;
    linkedinId?: string;
}): string => `
  <!DOCTYPE html>
  <html lang="en" style="margin:0;padding:0;">
    <head>
      <meta charset="UTF-8" />
      <title>New ${formType} Submission</title>
    </head>
    <body style="background-color: #f8fafc; margin:0; padding:2rem; font-family: Arial, sans-serif; color:#0f172a;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 5px 20px rgba(0,0,0,0.08);">
        <tr>
          <td style="padding:2rem 2rem 1rem;">
            <h2 style="color: #0c0a09; background-color: #f97316; padding: 1rem; border-radius: 8px; color: #ffffff; margin:0 0 1rem; font-size: 20px;">
              New ${formType} Received 🎉
            </h2>
            <p style="font-size:16px; line-height:1.6; margin:0 0 1.5rem; color:#334155;">
              A user just submitted a ${formType.toLowerCase()} form. Here are the details:
            </p>

            <table cellpadding="0" cellspacing="0" style="width:100%; font-size:15px; line-height:1.5; margin-bottom:2rem;">
              <tr>
                <td style="font-weight:bold; color:#0c0a09; padding:6px 0;">Name:</td>
                <td style="color:#334155;">${name}</td>
              </tr>
              <tr>
                <td style="font-weight:bold; color:#0c0a09; padding:6px 0;">Contact:</td>
                <td style="color:#334155;">${contact}</td>
              </tr>
              ${email ? `
              <tr>
                <td style="font-weight:bold; color:#0c0a09; padding:6px 0;">Email:</td>
                <td style="color:#334155;">${email}</td>
              </tr>
              ` : ''}
              ${linkedinId ? `
              <tr>
                <td style="font-weight:bold; color:#0c0a09; padding:6px 0;">LinkedIn:</td>
                <td style="color:#1e40af;">
                  <a href="${linkedinId}" target="_blank" style="color:#1e40af; text-decoration:underline;">${linkedinId}</a>
                </td>
              </tr>
              ` : ''}
            </table>

            <h3 style="color:#0c0a09; font-size: 16px; margin:0 0 0.5rem;">Message:</h3>
            <div style="background: #f1f5f9; padding: 1rem; border-left: 4px solid #1e40af; border-radius: 6px; color:#334155; font-size:15px; line-height:1.6;">
              ${message}
            </div>

            <p style="font-size:13px; line-height:1.5; margin:2rem 0 0; color:#64748b;">
              — The PrepForge Website Notification
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
