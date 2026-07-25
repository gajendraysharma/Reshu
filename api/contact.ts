import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      email,
      mobileNumber,
      companyName,
      role,
      industry,
      revenue,
      engagementFocus,
      message,
      requestNda
    } = req.body || {};

    const custName = fullName || "Valued Leader";
    const custEmail = email || "";
    const phone = mobileNumber || "Not specified";
    const compName = companyName || "Enterprise Client";
    const userRole = role || "Executive";
    const ind = industry || "General Business";
    const revBand = revenue || "Not specified";
    const focus = engagementFocus || "General Strategic Inquiry";
    const msg = message || "No additional notes provided.";
    const ndaRequested = requestNda ? "YES - Mutual NDA Requested Prior to Call" : "Standard Confidentiality Agreement";

    const formattedDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short"
    });

    const user = process.env.SMTP_USER || "enquiry.krgone@gmail.com";
    const rawPass = process.env.SMTP_PASS || "xizf aulp djxr sptv";
    const pass = rawPass.replace(/\s+/g, "");
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "enquiry.krgone@gmail.com";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      }
    });

    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>KRG ONE Inquiry Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="background-color: #0f172a; padding: 32px; text-align: center; border-bottom: 4px solid #d4af37;">
                    <div style="font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: 1px; margin-bottom: 8px;">KRG <span style="color: #d4af37;">ONE</span></div>
                    <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px;">Management Consulting & Enterprise Advisory</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px 32px 16px 32px;">
                    <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 800; color: #0f172a;">Contact Request Received</h1>
                    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                      Dear <strong>${custName}</strong>,<br><br>
                      Thank you for reaching out to KRG ONE Advisory. We have successfully received your inquiry regarding <strong>${focus}</strong>.
                    </p>
                    <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 18px 20px;">
                      <div style="font-size: 14px; color: #065f46; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                        ⚡ OUR TEAM WILL GET BACK TO YOU SOON
                      </div>
                      <div style="font-size: 13px; color: #047857; line-height: 1.6;">
                        A Senior Management Consultant from KRG ONE will review your submission and contact you within <strong>4 to 12 business hours</strong> via phone (<strong>${phone}</strong>) or email to discuss your requirements.
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const leadHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Us Advisory Inquiry</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Arial, sans-serif; color: #e2e8f0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 24px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" style="max-width: 650px; background-color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
                <tr>
                  <td style="background-color: #d4af37; padding: 20px 28px; color: #0f172a;">
                    <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
                      KRG ONE Contact Desk Alert
                    </div>
                    <h2 style="margin: 4px 0 0 0; font-size: 20px; font-weight: 900;">
                      📬 New Executive Contact Inquiry: ${compName}
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px 28px;">
                    <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 20px; font-size: 13px;">
                      <tr style="border-bottom: 1px solid #334155;">
                        <td style="padding: 8px 0; font-weight: 700; color: #94a3b8; width: 140px;">Full Name:</td>
                        <td style="padding: 8px 0; font-weight: 800; color: #ffffff;">${custName}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #334155;">
                        <td style="padding: 8px 0; font-weight: 700; color: #94a3b8;">Email Address:</td>
                        <td style="padding: 8px 0; font-weight: 800; color: #38bdf8;">
                          <a href="mailto:${custEmail}" style="color: #38bdf8; text-decoration: underline;">${custEmail}</a>
                        </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #334155;">
                        <td style="padding: 8px 0; font-weight: 700; color: #94a3b8;">Mobile / Phone:</td>
                        <td style="padding: 8px 0; font-weight: 800; color: #fef08a;">
                          <a href="tel:${phone}" style="color: #fef08a; text-decoration: none;">${phone}</a>
                        </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #334155;">
                        <td style="padding: 8px 0; font-weight: 700; color: #94a3b8;">Engagement Focus:</td>
                        <td style="padding: 8px 0; font-weight: 800; color: #d4af37;">${focus}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 700; color: #94a3b8;">Client Message:</td>
                        <td style="padding: 8px 0; font-weight: 500; color: #e2e8f0; line-height: 1.5;">${msg}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const customerMailOptions = {
      from: `"KRG ONE Advisory" <${user}>`,
      replyTo: `enquiry.krgone@gmail.com`,
      to: custEmail,
      subject: `Contact Request Confirmation - ${compName} | KRG ONE Advisory`,
      html: customerHtml,
      headers: {
        'X-Mailer': 'KRG ONE Contact Dispatcher',
        'X-Priority': '3',
        'Importance': 'normal'
      }
    };

    const leadMailOptions = {
      from: `"KRG ONE Contact Desk" <${user}>`,
      replyTo: custEmail,
      to: notificationEmail,
      subject: `New Contact Us Inquiry: ${compName} (${custName}) - ${phone}`,
      html: leadHtml,
      headers: {
        'X-Mailer': 'KRG ONE Internal Desk',
        'X-Priority': '3',
        'Importance': 'normal'
      }
    };

    if (custEmail.toLowerCase() === notificationEmail.toLowerCase()) {
      await transporter.sendMail(leadMailOptions);
    } else {
      await Promise.allSettled([
        transporter.sendMail(customerMailOptions),
        transporter.sendMail(leadMailOptions)
      ]);
    }

    res.json({
      success: true,
      message: "Contact request submitted successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to submit contact request"
    });
  }
}
