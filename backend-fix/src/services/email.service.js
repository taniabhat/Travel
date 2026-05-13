// src/services/email.service.js

import * as Brevo from '@getbrevo/brevo';

const getClient = () => {
    const apiInstance = new Brevo.TransactionalEmailsApi();

    apiInstance.authentications['api-key'].apiKey =
        process.env.BREVO_API_KEY;

    return apiInstance;
};

const escapeHtml = (value = '') => {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

export const sendBookingConfirmation = async (
    userEmail,
    userName,
    booking,
    tour
) => {
    try {
        const apiInstance = getClient();

        const safeUserName = escapeHtml(userName);
        const safeTourTitle = escapeHtml(
            tour?.title || 'Tour Package'
        );

        const travelDate = new Date(
            booking.travelDate
        ).toLocaleDateString(
            'en-IN',
            {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }
        );

        const htmlContent = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#faf9f6;font-family:Segoe UI,Tahoma,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;">
    
    <div style="background:#0B1D32;padding:40px;text-align:center;">
      <h1 style="color:#fff;margin:0;">Way.Farer</h1>
      <p style="color:#cbd5e1;">YOUR ADVENTURE AWAITS</p>
    </div>

    <div style="padding:32px;text-align:center;">
      <h2 style="margin-bottom:8px;">Booking Confirmed 🎉</h2>

      <p>
        Thank you, ${safeUserName}.
      </p>

      <div style="margin-top:24px;padding:24px;background:#f8fafc;border-radius:12px;text-align:left;">
        
        <h3>${safeTourTitle}</h3>

        <p><strong>Booking ID:</strong> ${booking._id}</p>

        <p><strong>Payment ID:</strong> ${
            booking.paymentId || 'N/A'
        }</p>

        <p><strong>Travel Date:</strong> ${travelDate}</p>

        <p><strong>Guests:</strong> ${booking.guests}</p>

        <p style="font-size:20px;font-weight:bold;">
          Total Paid: ₹${booking.totalPrice.toLocaleString('en-IN')}
        </p>

      </div>
    </div>

    <div style="padding:24px;text-align:center;background:#f8fafc;">
      <p style="font-size:12px;color:#64748b;">
        Need help? Contact info@travel.in
      </p>
    </div>

  </div>
</body>
</html>
`;

        const email = new Brevo.SendSmtpEmail();

        email.to = [
            {
                email: userEmail,
                name: userName,
            },
        ];

        email.sender = {
            name: process.env.FROM_NAME || 'Way.Farer',
            email: process.env.FROM_EMAIL,
        };

        email.subject =
            `Booking Confirmed — ${safeTourTitle}`;

        email.htmlContent = htmlContent;

        await apiInstance.sendTransacEmail(email);

        console.log(
            `Confirmation email sent to ${userEmail}`
        );
    } catch (error) {
        console.error(
            `Failed to send email to ${userEmail}:`,
            error.message
        );
    }
};