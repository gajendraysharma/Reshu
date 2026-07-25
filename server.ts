import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON parsing with generous limits (for dossier HTML)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Helper to format Gmail credentials cleanly (stripping spaces if app password provided with spaces)
  const getSmtpCredentials = () => {
    const user = process.env.SMTP_USER || "enquiry.krgone@gmail.com";
    const rawPass = process.env.SMTP_PASS || "xizf aulp djxr sptv";
    const pass = rawPass.replace(/\s+/g, "");
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "enquiry.krgone@gmail.com";
    return { user, pass, notificationEmail };
  };

  // Helper to construct Nodemailer Transporter
  const createTransporter = () => {
    const { user, pass } = getSmtpCredentials();
    return nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      }
    });
  };

  // Helper to generate PDF Buffer using Puppeteer
  const generatePdfBuffer = async (
    dossierHtml: string | undefined, 
    compName: string, 
    custName: string, 
    overallScore: number, 
    pillarScores: any[], 
    formData: any
  ): Promise<Buffer | null> => {
    let browser = null;
    try {
      const fullHtml = dossierHtml && dossierHtml.trim().length > 100 ? `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>KRGONE Business Growth Diagnostic Report - ${compName}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @media print {
                @page { size: A4 portrait; margin: 0; }
                body { margin: 0 !important; padding: 0 !important; background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                .print-page { 
                  width: 210mm !important; 
                  height: 297mm !important; 
                  min-height: 297mm !important; 
                  max-height: 297mm !important; 
                  box-sizing: border-box !important; 
                  page-break-after: always !important; 
                  break-after: page !important; 
                  page-break-inside: avoid !important; 
                  break-inside: avoid !important; 
                  margin: 0 auto !important; 
                  padding: 10mm 12mm 12mm 12mm !important; 
                  position: relative !important; 
                  display: flex !important; 
                  flex-direction: column !important;
                  justify-content: space-between !important;
                  background-color: #ffffff; 
                  overflow: hidden !important; 
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                .print-page.dark-cover,
                .print-page.bg-\[\#030712\],
                .print-page.bg-\[\#030816\] {
                  background-color: #030712 !important;
                  color: #ffffff !important;
                }
                .no-print { display: none !important; }
              }
              body { font-family: system-ui, -apple-system, sans-serif; background: #ffffff; margin: 0; padding: 0; }
              .print-page { 
                  background: white; 
                  width: 210mm !important; 
                  height: 297mm !important; 
                  min-height: 297mm !important; 
                  max-height: 297mm !important; 
                  padding: 10mm 12mm 12mm 12mm !important; 
                  margin: 0 auto !important; 
                  box-sizing: border-box; 
                  position: relative; 
                  overflow: hidden !important;
                  display: flex !important;
                  flex-direction: column !important;
                  justify-content: space-between !important;
              }
              .print-page.dark-cover,
              .print-page.bg-\[\#030712\],
              .print-page.bg-\[\#030816\] {
                  background: #030712 !important;
                  color: #ffffff !important;
              }
            </style>
          </head>
          <body>
            ${dossierHtml}
          </body>
        </html>
      ` : `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>KRG ONE Assessment Report - ${compName}</title>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body style="font-family: Arial, sans-serif; padding: 40px; background-color: #ffffff; color: #0f172a;">
            <div style="border-bottom: 3px solid #d4af37; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="font-size: 28px; font-weight: 900; color: #0f172a; margin: 0;">KRG <span style="color: #d4af37;">ONE</span></h1>
              <p style="font-size: 13px; color: #64748b; font-weight: bold; margin-top: 4px; text-transform: uppercase; letter-spacing: 2px;">Management Consulting & Enterprise Advisory</p>
            </div>
            <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Executive Assessment Diagnostic Report</h2>
            <p style="font-size: 14px; color: #475569;"><strong>Company Name:</strong> ${compName}</p>
            <p style="font-size: 14px; color: #475569;"><strong>Executive Name:</strong> ${custName}</p>
            <p style="font-size: 14px; color: #475569;"><strong>Overall Growth Score:</strong> ${overallScore}%</p>
            <p style="font-size: 14px; color: #475569;"><strong>Industry:</strong> ${formData?.industry || 'Commercial'}</p>
            <p style="font-size: 14px; color: #475569;"><strong>Revenue Band:</strong> ${formData?.revenue || 'Not Specified'}</p>
          </body>
        </html>
      `;

      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 1600 });
      await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1000));
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
      });

      await browser.close();
      return pdfBuffer;
    } catch (err) {
      console.error("Error generating PDF with Puppeteer:", err);
      if (browser) {
        try { await browser.close(); } catch (e) {}
      }
      return null;
    }
  };

  // Server-side deduplication memory store to prevent double email dispatches
  const recentEmailDispatches = new Map<string, number>();

  // ----------------------------------------------------
  // API ROUTES
  // ----------------------------------------------------
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Test Email Endpoint for Diagnostics
  app.get("/api/test-email", async (req, res) => {
    try {
      const { user, notificationEmail } = getSmtpCredentials();
      const transporter = createTransporter();
      
      const info = await transporter.sendMail({
        from: `"KRG ONE Engine" <${user}>`,
        to: notificationEmail,
        subject: "🧪 KRG ONE SMTP Diagnostic Test",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 8px;">
            <h2 style="color: #d4af37; margin-top: 0;">KRG ONE Email Dispatcher Active</h2>
            <p style="color: #cbd5e1;">SMTP transport verified successfully for <strong>${user}</strong>.</p>
            <p style="font-size: 12px; color: #94a3b8;">Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </div>
        `
      });

      res.json({ success: true, messageId: info.messageId, recipient: notificationEmail });
    } catch (error: any) {
      console.error("Error in test-email endpoint:", error);
      res.status(500).json({ success: false, error: error.message || "Failed to send test email" });
    }
  });

  // Main Endpoint: Dispatch Assessment Acknowledgment & Lead Notification
  app.post("/api/send-assessment-email", async (req, res) => {
    try {
      const { formData, scores, overallScore, pillarScores, recommendations, dossierHtml } = req.body;

      if (!formData || !formData.email) {
        return res.status(400).json({ success: false, error: "Missing required customer email or form data" });
      }

      const { user, notificationEmail } = getSmtpCredentials();
      const transporter = createTransporter();

      const compName = formData.companyName || "Your Enterprise";
      const custName = formData.fullName || "Valued Executive";
      const custEmail = formData.email.trim();

      // Check server-side deduplication cache (30-second window per email/company combination)
      const customerType = formData.customerType || "Assessment";
      const dedupeKey = `${custEmail.toLowerCase()}_${compName.toLowerCase()}_${customerType.toLowerCase()}`;
      const now = Date.now();
      const lastSent = recentEmailDispatches.get(dedupeKey);
      if (lastSent && (now - lastSent) < 30000) {
        console.log(`[DEDUPLICATION] Suppressing duplicate email request for key: ${dedupeKey}`);
        return res.json({
          success: true,
          message: "Duplicate email dispatch suppressed (already sent within last 30s)",
          deduplicated: true,
          timestamp: new Date().toISOString()
        });
      }
      recentEmailDispatches.set(dedupeKey, now);

      // Clean up stale cache items
      if (recentEmailDispatches.size > 100) {
        for (const [key, timestamp] of recentEmailDispatches.entries()) {
          if (now - timestamp > 60000) recentEmailDispatches.delete(key);
        }
      }
      const mobileNumber = formData.mobileNumber || "Not Provided";
      const role = formData.role === 'Other' && formData.roleOther ? formData.roleOther : (formData.role || "Executive");
      const industry = formData.industry === 'Other' && formData.industryOther ? formData.industryOther : (formData.industry || "Commercial Vertical");
      const revenue = formData.revenue || "Not Specified";
      const businessSize = formData.businessSize || "Not Specified";
      const location = `${formData.city || 'City'}, ${formData.state || 'State'}`;
      const challengesList = Array.isArray(formData.challenges) && formData.challenges.length > 0 
        ? formData.challenges.join(", ") 
        : "Operational & Scaling Bottlenecks";
      const goalsList = Array.isArray(formData.goals) && formData.goals.length > 0 
        ? formData.goals.join(", ") 
        : "Business Systems & Revenue Expansion";

      const finalScore = typeof overallScore === 'number' ? overallScore : 72;
      const formattedDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

      // Generate PDF attachment buffer via Puppeteer
      console.log(`Generating PDF dossier attachment for ${compName}...`);
      const pdfBuffer = await generatePdfBuffer(dossierHtml, compName, custName, finalScore, pillarScores, formData);

      const safeCompFileName = compName.replace(/[^a-zA-Z0-9]/g, '_');
      const attachments = pdfBuffer ? [
        {
          filename: `KRG_ONE_Diagnostic_Report_${safeCompFileName}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ] : [];

      // Build Pillars HTML table rows
      const pillarsList = [
        "Leadership & Vision",
        "Sales & Revenue",
        "Marketing & Customer Growth",
        "Operations & Process",
        "Finance & Business Performance",
        "People & Leadership",
        "Technology & Business Innovation"
      ];

      const pillarRowsHtml = pillarsList.map((pName, idx) => {
        const pScore = Array.isArray(pillarScores) && pillarScores[idx] !== undefined 
          ? pillarScores[idx] 
          : Math.min(100, Math.round(((scores?.[idx * 3] || 3) + (scores?.[idx * 3 + 1] || 3) + (scores?.[idx * 3 + 2] || 3)) / 15 * 100));
        
        let ratingBadge = "Needs Alignment";
        let badgeBg = "#fef2f2";
        let badgeColor = "#991b1b";
        if (pScore >= 80) {
          ratingBadge = "Optimal Performance";
          badgeBg = "#ecfdf5";
          badgeColor = "#065f46";
        } else if (pScore >= 60) {
          ratingBadge = "Moderate Scalability";
          badgeBg = "#fffbeb";
          badgeColor = "#92400e";
        }

        return `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px 12px; font-weight: 600; color: #1e293b; font-size: 13px;">${pName}</td>
            <td style="padding: 10px 12px; font-weight: 800; color: #0f172a; font-size: 13px; text-align: center;">${pScore}%</td>
            <td style="padding: 10px 12px; text-align: right;">
              <span style="display: inline-block; padding: 4px 8px; border-radius: 4px; background-color: ${badgeBg}; color: ${badgeColor}; font-size: 11px; font-weight: 700;">
                ${ratingBadge}
              </span>
            </td>
          </tr>
        `;
      }).join('');

      // -----------------------------------------------------------------
      // EMAIL 1: CUSTOMER ACKNOWLEDGMENT & EXECUTIVE BRIEFING REPORT
      // -----------------------------------------------------------------
      const customerMailOptions = {
        from: `"KRG ONE Advisory" <${user}>`,
        to: custEmail,
        subject: `Assessment Report & Strategic Acknowledgment - ${compName} | KRG ONE`,
        attachments,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Assessment Report - KRG ONE</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Arial, sans-serif; color: #334155;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 24px 12px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" style="max-width: 650px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
                    
                    <!-- BRANDING HEADER -->
                    <tr>
                      <td style="background-color: #0f172a; padding: 32px 28px; text-align: center; border-bottom: 3px solid #d4af37;">
                        <div style="font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #ffffff; margin-bottom: 4px;">
                          KRG <span style="color: #d4af37;">ONE</span>
                        </div>
                        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #94a3b8;">
                          Management Consulting & Enterprise Advisory
                        </div>
                      </td>
                    </tr>

                    <!-- HERO CONFIRMATION BANNER -->
                    <tr>
                      <td style="padding: 28px 28px 16px 28px; background-color: #f1f5f9; border-bottom: 1px solid #e2e8f0;">
                        <div style="display: inline-block; background-color: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); padding: 4px 12px; border-radius: 20px; color: #854d0e; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">
                          Official Assessment Acknowledgment
                        </div>
                        <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 900; color: #0f172a; line-height: 1.3;">
                          Strategic Business Growth Assessment Completed
                        </h1>
                        <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">
                          Dear <strong>${custName}</strong>, thank you for completing the KRG ONE diagnostic audit for <strong>${compName}</strong>. Your executive parameters have been evaluated by our core business intelligence engine.
                        </p>
                      </td>
                    </tr>

                    <!-- PDF ATTACHMENT NOTICE -->
                    <tr>
                      <td style="padding: 16px 28px 0 28px;">
                        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;">
                          <div style="font-size: 13px; color: #166534; font-weight: 700;">
                            📎 <strong>Full Diagnostic PDF Dossier Attached:</strong>
                            <span style="font-weight: 500; display: block; color: #15803d; font-size: 12px; margin-top: 2px;">
                              Your custom report PDF (KRG_ONE_Diagnostic_Report_${safeCompFileName}.pdf) is attached to this email for download and print.
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <!-- EXECUTIVE SCORE HIGHLIGHT CARD -->
                    <tr>
                      <td style="padding: 20px 28px;">
                        <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f172a; border-radius: 12px; padding: 20px; color: #ffffff;">
                          <tr>
                            <td style="vertical-align: middle;">
                              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #d4af37; margin-bottom: 4px;">
                                Overall Growth Readiness Index
                              </div>
                              <div style="font-size: 16px; font-weight: 800; color: #ffffff;">
                                ${compName} (${industry})
                              </div>
                              <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
                                Revenue Band: ${revenue} | Size: ${businessSize}
                              </div>
                            </td>
                            <td width="110" align="right" style="vertical-align: middle;">
                              <div style="background-color: rgba(212, 175, 55, 0.2); border: 2px solid #d4af37; border-radius: 12px; width: 80px; height: 80px; text-align: center; display: table;">
                                <div style="display: table-cell; vertical-align: middle;">
                                  <span style="font-size: 26px; font-weight: 900; color: #fef08a; display: block; line-height: 1;">${finalScore}%</span>
                                  <span style="font-size: 9px; font-weight: 700; color: #cbd5e1; uppercase;">SCORE</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- 7-PILLAR EVALUATION BREAKDOWN -->
                    <tr>
                      <td style="padding: 0 28px 20px 28px;">
                        <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                          7-Pillar Enterprise Diagnostics Breakdown
                        </h3>
                        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                          <thead>
                            <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                              <th align="left" style="padding: 10px 12px; font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 800;">Business Pillar</th>
                              <th align="center" style="padding: 10px 12px; font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 800;">Score</th>
                              <th align="right" style="padding: 10px 12px; font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 800;">Operational Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${pillarRowsHtml}
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <!-- KEY OBSERVATIONS & RECOMMENDATIONS -->
                    <tr>
                      <td style="padding: 0 28px 24px 28px;">
                        <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 18px;">
                          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 800; color: #92400e; text-transform: uppercase;">
                            💡 Key Executive Focus Areas Identified
                          </h4>
                          <p style="margin: 0 0 10px 0; font-size: 13px; color: #78350f; line-height: 1.5;">
                            Based on your primary challenge <strong>"${challengesList}"</strong>, your organization requires standard operating systemization (SOP playbooks) and stage-gate CRM pipeline automation to decouple growth from manual founder oversight.
                          </p>
                          <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #92400e; line-height: 1.6;">
                            <li><strong>Systemize SOPs:</strong> Document high-leverage sales & delivery processes into digital playbooks.</li>
                            <li><strong>CRM Stage-Gate Rules:</strong> Eliminate lost leads with automated SLA follow-ups.</li>
                            <li><strong>13-Week Cash Rolling Forecast:</strong> Protect unit gross profit margins against unbilled scope creep.</li>
                          </ul>
                        </div>
                      </td>
                    </tr>

                    <!-- ACTION CTA BLOCK -->
                    <tr>
                      <td style="padding: 20px 28px 24px 28px; background-color: #0f172a; text-align: center; border-top: 1px solid #1e293b;">
                        <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 900; color: #ffffff;">
                          Ready to Unlock Scalable Enterprise Growth?
                        </h3>
                        <p style="margin: 0 0 20px 0; font-size: 13px; color: #94a3b8; max-width: 480px; margin-left: auto; margin-right: auto;">
                          Book a 1-on-1 Strategic Review with a Senior Partner at KRG ONE to review your custom PDF Dossier and 90-day execution roadmap.
                        </p>
                        <a href="mailto:enquiry.krgone@gmail.com?subject=Schedule%20Partner%20Review%20-%20${encodeURIComponent(compName)}" style="display: inline-block; background-color: #d4af37; color: #0f172a; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 900; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
                          Book 1-on-1 Partner Strategy Call
                        </a>
                      </td>
                    </tr>

                    <!-- KRG ONE DIRECT CONTACT DETAILS CARD -->
                    <tr>
                      <td style="padding: 0 28px 24px 28px;">
                        <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 12px; padding: 18px;">
                          <tr>
                            <td>
                              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #b45309; margin-bottom: 4px;">
                                KRG ONE Enterprise Advisory Desk
                              </div>
                              <h4 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 900; color: #0f172a;">
                                Official Advisory Contact Details
                              </h4>
                              <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; color: #334155;">
                                <tr>
                                  <td style="padding: 4px 0; font-weight: 700; width: 130px; color: #64748b;">Official Email:</td>
                                  <td style="padding: 4px 0; font-weight: 800; color: #0284c7;">
                                    <a href="mailto:enquiry.krgone@gmail.com" style="color: #0284c7; text-decoration: underline;">enquiry.krgone@gmail.com</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 4px 0; font-weight: 700; color: #64748b;">Direct Hotline:</td>
                                  <td style="padding: 4px 0; font-weight: 800; color: #0f172a;">
                                    <a href="tel:+917300300330" style="color: #0f172a; text-decoration: none;">+91 7300300330</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 4px 0; font-weight: 700; color: #64748b;">Corporate HQ:</td>
                                  <td style="padding: 4px 0; font-weight: 600; color: #334155;">Jaipur, Rajasthan, India</td>
                                </tr>
                                <tr>
                                  <td style="padding: 4px 0; font-weight: 700; color: #64748b;">Advisory Portal:</td>
                                  <td style="padding: 4px 0; font-weight: 600; color: #0284c7;">
                                    <a href="https://www.krgone.vercel.app" style="color: #0284c7; text-decoration: underline;">www.krgone.vercel.app</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                      <td style="padding: 20px 28px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.5;">
                        <p style="margin: 0 0 4px 0; font-weight: 700; color: #64748b;">
                          KRG ONE Business Management Advisory
                        </p>
                        <p style="margin: 0 0 4px 0;">
                          Official Email: <a href="mailto:enquiry.krgone@gmail.com" style="color: #0284c7; text-decoration: none;">enquiry.krgone@gmail.com</a> • Phone: <a href="tel:+917300300330" style="color: #0284c7; text-decoration: none;">+91 7300300330</a>
                        </p>
                        <p style="margin: 0;">
                          Submitted on ${formattedDate} IST • Confidential Enterprise Diagnostic Report
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
      };

      // -----------------------------------------------------------------
      // EMAIL 2: KRG ONE INTERNAL LEAD NOTIFICATION EMAIL
      // -----------------------------------------------------------------
      const leadMailOptions = {
        from: `"KRG ONE Lead Engine" <${user}>`,
        to: notificationEmail,
        subject: `🚨 NEW LEAD: ${compName} (${custName}) - Growth Score: ${finalScore}%`,
        attachments,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Lead Notification</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Arial, sans-serif; color: #e2e8f0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 24px 12px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" style="max-width: 650px; background-color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 20px 30px rgba(0,0,0,0.5);">
                    
                    <!-- ALERT HEADER -->
                    <tr>
                      <td style="background-color: #d4af37; padding: 20px 28px; color: #0f172a;">
                        <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
                          KRG ONE Internal Lead Alert System
                        </div>
                        <h2 style="margin: 4px 0 0 0; font-size: 20px; font-weight: 900;">
                          New Business Assessment Submission Received
                        </h2>
                      </td>
                    </tr>

                    <!-- LEAD OVERVIEW CARDS -->
                    <tr>
                      <td style="padding: 24px 28px;">
                        
                        <!-- HIGH VALUE BADGE -->
                        <div style="background-color: #0f172a; border: 1px solid #d4af37; border-radius: 12px; padding: 16px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
                          <div>
                            <span style="font-size: 10px; font-weight: 800; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; display: block;">
                              Company Name
                            </span>
                            <span style="font-size: 20px; font-weight: 900; color: #ffffff; display: block;">
                              ${compName}
                            </span>
                            <span style="font-size: 12px; color: #94a3b8;">
                              Location: ${location} | Customer Type: ${formData.customerType || 'B2B'}
                            </span>
                          </div>
                          <div style="text-align: right; background-color: rgba(212, 175, 55, 0.2); padding: 8px 16px; border-radius: 8px; border: 1px solid #d4af37;">
                            <span style="font-size: 22px; font-weight: 900; color: #fef08a; display: block;">${finalScore}%</span>
                            <span style="font-size: 9px; font-weight: 800; color: #cbd5e1; uppercase;">GROWTH INDEX</span>
                          </div>
                        </div>

                        <!-- PDF ATTACHMENT NOTICE FOR LEAD -->
                        <div style="background-color: #0f172a; border: 1px solid #38bdf8; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 12px; color: #38bdf8; font-weight: bold;">
                          📎 Attached File: KRG_ONE_Diagnostic_Report_${safeCompFileName}.pdf
                        </div>

                        <!-- CUSTOMER CONTACT DETAILS TABLE -->
                        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 800; color: #d4af37; text-transform: uppercase; border-bottom: 1px solid #334155; padding-bottom: 6px;">
                          👤 Executive Contact Profile
                        </h3>
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
                              <a href="tel:${mobileNumber}" style="color: #fef08a; text-decoration: none;">${mobileNumber}</a>
                            </td>
                          </tr>
                          <tr style="border-bottom: 1px solid #334155;">
                            <td style="padding: 8px 0; font-weight: 700; color: #94a3b8;">Role / Designation:</td>
                            <td style="padding: 8px 0; color: #e2e8f0;">${role}</td>
                          </tr>
                          <tr style="border-bottom: 1px solid #334155;">
                            <td style="padding: 8px 0; font-weight: 700; color: #94a3b8;">Industry Vertical:</td>
                            <td style="padding: 8px 0; color: #e2e8f0;">${industry}</td>
                          </tr>
                          <tr style="border-bottom: 1px solid #334155;">
                            <td style="padding: 8px 0; font-weight: 700; color: #94a3b8;">Annual Revenue:</td>
                            <td style="padding: 8px 0; font-weight: 800; color: #4ade80;">${revenue}</td>
                          </tr>
                          <tr style="border-bottom: 1px solid #334155;">
                            <td style="padding: 8px 0; font-weight: 700; color: #94a3b8;">Team Size:</td>
                            <td style="padding: 8px 0; color: #e2e8f0;">${businessSize}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; font-weight: 700; color: #94a3b8;">How They Heard:</td>
                            <td style="padding: 8px 0; color: #cbd5e1;">${formData.howHeard || 'Not Specified'}</td>
                          </tr>
                        </table>

                        <!-- CHALLENGES & GOALS -->
                        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 800; color: #d4af37; text-transform: uppercase; border-bottom: 1px solid #334155; padding-bottom: 6px;">
                          🎯 Challenges & Growth Goals
                        </h3>
                        <div style="background-color: #0f172a; padding: 14px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 20px; font-size: 12px; line-height: 1.6;">
                          <div style="margin-bottom: 8px;">
                            <strong style="color: #f87171;">Key Bottlenecks/Challenges:</strong>
                            <div style="color: #fecdd3; font-weight: 600;">${challengesList}</div>
                          </div>
                          <div>
                            <strong style="color: #4ade80;">Target Growth Goals:</strong>
                            <div style="color: #bbf7d0; font-weight: 600;">${goalsList}</div>
                          </div>
                        </div>

                        <!-- 7 PILLAR BREAKDOWN -->
                        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 800; color: #d4af37; text-transform: uppercase; border-bottom: 1px solid #334155; padding-bottom: 6px;">
                          📊 7-Pillar Score Breakdown
                        </h3>
                        <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 12px; border-collapse: collapse; background-color: #0f172a; border-radius: 8px; overflow: hidden; border: 1px solid #334155;">
                          <tr style="background-color: #1e293b; color: #94a3b8; font-weight: 800;">
                            <th align="left" style="padding: 8px 12px;">Pillar</th>
                            <th align="right" style="padding: 8px 12px;">Score</th>
                          </tr>
                          ${pillarsList.map((pName, idx) => {
                            const pScore = Array.isArray(pillarScores) && pillarScores[idx] !== undefined 
                              ? pillarScores[idx] 
                              : Math.min(100, Math.round(((scores?.[idx * 3] || 3) + (scores?.[idx * 3 + 1] || 3) + (scores?.[idx * 3 + 2] || 3)) / 15 * 100));
                            return `
                              <tr style="border-bottom: 1px solid #334155;">
                                <td style="padding: 8px 12px; color: #cbd5e1;">${pName}</td>
                                <td style="padding: 8px 12px; font-weight: 800; color: #fef08a; text-align: right;">${pScore}%</td>
                              </tr>
                            `;
                          }).join('')}
                        </table>

                      </td>
                    </tr>

                    <!-- FOOTER ACTION -->
                    <tr>
                      <td style="padding: 20px 28px; background-color: #0f172a; border-top: 1px solid #334155; text-align: center;">
                        <a href="mailto:${custEmail}" style="display: inline-block; background-color: #38bdf8; color: #0f172a; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 900; font-size: 12px; text-transform: uppercase; margin-right: 8px;">
                          Reply to Lead (${custEmail})
                        </a>
                        <a href="tel:${mobileNumber}" style="display: inline-block; background-color: #4ade80; color: #0f172a; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 900; font-size: 12px; text-transform: uppercase;">
                          Call Lead (${mobileNumber})
                        </a>
                        <p style="font-size: 11px; color: #64748b; margin-top: 12px;">
                          Received at ${formattedDate} IST
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
      };

      // Check if customer email matches notification email (e.g., test email or KRG ONE inbox)
      const isSameRecipient = custEmail.toLowerCase() === notificationEmail.toLowerCase();

      let customerSent = false;
      let leadSent = false;

      if (isSameRecipient) {
        // Customer email is the KRG ONE notification email — send ONLY ONE combined Lead Alert email
        try {
          await transporter.sendMail(leadMailOptions);
          leadSent = true;
          customerSent = true;
          console.log(`[EMAIL DISPATCH] Sent single combined lead email to ${notificationEmail} (customer matches lead recipient)`);
        } catch (err) {
          console.error("Failed to send single lead email:", err);
        }
      } else {
        // Distinct recipients — send Customer Acknowledgment and Internal Lead Alert in parallel
        const results = await Promise.allSettled([
          transporter.sendMail(customerMailOptions),
          transporter.sendMail(leadMailOptions)
        ]);

        customerSent = results[0].status === 'fulfilled';
        leadSent = results[1].status === 'fulfilled';

        if (!customerSent) {
          console.error("Failed to send customer email:", (results[0] as PromiseRejectedResult).reason);
        }
        if (!leadSent) {
          console.error("Failed to send lead notification email:", (results[1] as PromiseRejectedResult).reason);
        }
      }

      res.json({
        success: true,
        message: "Assessment emails processed with PDF attachment",
        pdfAttached: !!pdfBuffer,
        customerEmailSent: customerSent,
        leadNotificationSent: leadSent,
        timestamp: new Date().toISOString()
      });

    } catch (error: any) {
      console.error("Error sending assessment emails:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to process email dispatch"
      });
    }
  });

  // ----------------------------------------------------
  // VITE MIDDLEWARE & STATIC ASSET FALLBACK
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
