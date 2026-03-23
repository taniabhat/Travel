const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

/**
 * Send booking confirmation email
 * @param {string} userEmail - Recipient email
 * @param {string} userName - Recipient name
 * @param {object} booking - Booking details
 * @param {object} tour - Tour details (populated)
 */
const sendBookingConfirmation = async (userEmail, userName, booking, tour) => {
    try {
        const transporter = createTransporter();

        const travelDate = new Date(booking.travelDate).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#faf9f6; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:16px; overflow:hidden; margin-top:32px; margin-bottom:32px; box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background-color:#0B1D32; padding:40px 32px; text-align:center;">
            <h1 style="color:#ffffff; margin:0; font-size:28px; font-weight:300; letter-spacing:2px;">Way.Farer</h1>
            <p style="color:rgba(255,255,255,0.6); margin:8px 0 0; font-size:13px; letter-spacing:1px;">YOUR ADVENTURE AWAITS</p>
        </div>

        <!-- Success Badge -->
        <div style="text-align:center; padding:32px 32px 0;">
            <div style="display:inline-block; background-color:#ecfdf5; border-radius:50%; width:64px; height:64px; line-height:64px; font-size:28px;">✓</div>
            <h2 style="color:#0f172a; margin:16px 0 4px; font-size:24px;">Booking Confirmed!</h2>
            <p style="color:#64748b; margin:0; font-size:14px;">Thank you, ${userName}. Your trip is all set.</p>
        </div>

        <!-- Booking Details -->
        <div style="padding:24px 32px;">
            <div style="background-color:#f8fafc; border-radius:12px; padding:24px; border:1px solid #e2e8f0;">
                <h3 style="color:#0f172a; margin:0 0 16px; font-size:16px; text-transform:uppercase; letter-spacing:1px;">${tour?.title || 'Tour Package'}</h3>
                
                <table style="width:100%; border-collapse:collapse;">
                    <tr>
                        <td style="padding:8px 0; color:#64748b; font-size:13px; border-bottom:1px solid #e2e8f0;">Booking ID</td>
                        <td style="padding:8px 0; color:#0f172a; font-size:13px; font-weight:600; text-align:right; border-bottom:1px solid #e2e8f0;">${booking._id}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 0; color:#64748b; font-size:13px; border-bottom:1px solid #e2e8f0;">Payment ID</td>
                        <td style="padding:8px 0; color:#0f172a; font-size:13px; font-weight:600; text-align:right; border-bottom:1px solid #e2e8f0;">${booking.paymentId || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 0; color:#64748b; font-size:13px; border-bottom:1px solid #e2e8f0;">Travel Date</td>
                        <td style="padding:8px 0; color:#0f172a; font-size:13px; font-weight:600; text-align:right; border-bottom:1px solid #e2e8f0;">${travelDate}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 0; color:#64748b; font-size:13px; border-bottom:1px solid #e2e8f0;">Guests</td>
                        <td style="padding:8px 0; color:#0f172a; font-size:13px; font-weight:600; text-align:right; border-bottom:1px solid #e2e8f0;">${booking.guests} People</td>
                    </tr>
                    <tr>
                        <td style="padding:12px 0; color:#64748b; font-size:14px; font-weight:600;">Total Paid</td>
                        <td style="padding:12px 0; color:#0f172a; font-size:20px; font-weight:700; text-align:right;">$${booking.totalPrice.toLocaleString()}</td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color:#f8fafc; padding:24px 32px; text-align:center; border-top:1px solid #e2e8f0;">
            <p style="color:#94a3b8; font-size:12px; margin:0 0 4px;">Need help? Contact us at info@travel.in</p>
            <p style="color:#94a3b8; font-size:12px; margin:0;">+91 6201925034 • Delhi, India</p>
            <p style="color:#cbd5e1; font-size:11px; margin:16px 0 0;">© ${new Date().getFullYear()} Way.Farer. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;

        const mailOptions = {
            from: `"${process.env.FROM_NAME || 'Way.Farer'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
            to: userEmail,
            subject: `Booking Confirmed — ${tour?.title || 'Your Tour'} 🎉`,
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Confirmation email sent to ${userEmail}`);
    } catch (error) {
        // Non-blocking — log error but don't break the booking flow
        console.error(`❌ Failed to send confirmation email to ${userEmail}:`, error.message);
    }
};

module.exports = { sendBookingConfirmation };
