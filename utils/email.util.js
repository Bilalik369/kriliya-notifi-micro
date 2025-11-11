import nodemailer from "nodemailer";


const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Kri Liya" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(" Email sending error:", error);
    return { success: false, error: error.message };
  }
};


export const emailTemplates = {
  welcome: (userName) => ({
    subject: "Welcome to Kri Liya!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome to Kri Liya, ${userName}!</h1>
        <p>Thank you for joining our rental marketplace community.</p>
        <p>You can now start renting items or listing your own items for rent.</p>
        <p>Best regards,<br>The Kri Liya Team</p>
      </div>
    `,
    text: `Welcome to Kri Liya, ${userName}! Thank you for joining our rental marketplace community.`,
  }),

  bookingRequest: (ownerName, itemTitle, renterName, startDate, endDate) => ({
    subject: "New Booking Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">New Booking Request</h1>
        <p>Hi ${ownerName},</p>
        <p>${renterName} has requested to rent your item: <strong>${itemTitle}</strong></p>
        <p><strong>Rental Period:</strong> ${startDate} to ${endDate}</p>
        <p>Please review and respond to this booking request.</p>
        <p>Best regards,<br>The Kri Liya Team</p>
      </div>
    `,
    text: `Hi ${ownerName}, ${renterName} requested to rent ${itemTitle} from ${startDate} to ${endDate}.`,
  }),

  bookingConfirmed: (renterName, itemTitle, startDate, endDate) => ({
    subject: "Booking Confirmed",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4CAF50;">Booking Confirmed!</h1>
        <p>Hi ${renterName},</p>
        <p>Your booking for <strong>${itemTitle}</strong> is confirmed!</p>
        <p><strong>Rental Period:</strong> ${startDate} to ${endDate}</p>
        <p>Please coordinate with the owner for pickup details.</p>
        <p>Best regards,<br>The Kri Liya Team</p>
      </div>
    `,
    text: `Hi ${renterName}, Your booking for ${itemTitle} is confirmed.`,
  }),

  bookingRejected: (renterName, itemTitle, reason) => ({
    subject: "Booking Request Declined",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #f44336;">Booking Request Declined</h1>
        <p>Hi ${renterName},</p>
        <p>Unfortunately, your booking request for <strong>${itemTitle}</strong> has been declined.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
        <p>Please browse other available items on our platform.</p>
        <p>Best regards,<br>The Kri Liya Team</p>
      </div>
    `,
    text: `Hi ${renterName}, Your booking request for ${itemTitle} has been declined.`,
  }),

  bookingCancelled: (userName, itemTitle, cancelledBy) => ({
    subject: "Booking Cancelled",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ff9800;">Booking Cancelled</h1>
        <p>Hi ${userName},</p>
        <p>The booking for <strong>${itemTitle}</strong> has been cancelled by ${cancelledBy}.</p>
        <p>If you have any questions, please contact support.</p>
        <p>Best regards,<br>The Kri Liya Team</p>
      </div>
    `,
    text: `Hi ${userName}, The booking for ${itemTitle} has been cancelled.`,
  }),

  paymentReceived: (userName, itemTitle, amount) => ({
    subject: "Payment Received",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4CAF50;">Payment Received</h1>
        <p>Hi ${userName},</p>
        <p>We have received your payment of <strong>${amount}</strong> for <strong>${itemTitle}</strong>.</p>
        <p>Your booking is now confirmed.</p>
        <p>Best regards,<br>The Kri Liya Team</p>
      </div>
    `,
    text: `Hi ${userName}, We have received your payment of ${amount} for ${itemTitle}.`,
  }),

  reviewReceived: (userName, reviewerName, rating, itemTitle) => ({
    subject: "New Review Received",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">New Review Received</h1>
        <p>Hi ${userName},</p>
        <p>${reviewerName} has left a ${rating}-star review for <strong>${itemTitle}</strong>.</p>
        <p>Check your dashboard to view the review and respond.</p>
        <p>Best regards,<br>The Kri Liya Team</p>
      </div>
    `,
    text: `Hi ${userName}, ${reviewerName} has left a ${rating}-star review for ${itemTitle}.`,
  }),

  reminderCheckIn: (ownerName, itemTitle, renterName, date) => ({
    subject: "Reminder: Check-in Today",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2196F3;">Reminder: Check-in Today</h1>
        <p>Hi ${ownerName},</p>
        <p>This is a reminder that ${renterName} is scheduled to pick up <strong>${itemTitle}</strong> today (${date}).</p>
        <p>Please ensure the item is ready for pickup.</p>
        <p>Best regards,<br>The Kri Liya Team</p>
      </div>
    `,
    text: `Hi ${ownerName}, Reminder: ${renterName} is scheduled to pick up ${itemTitle} today.`,
  }),

  reminderCheckOut: (ownerName, itemTitle, renterName, date) => ({
    subject: "Reminder: Check-out Today",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2196F3;">Reminder: Check-out Today</h1>
        <p>Hi ${ownerName},</p>
        <p>This is a reminder that ${renterName} is scheduled to return <strong>${itemTitle}</strong> today (${date}).</p>
        <p>Please inspect the item upon return.</p>
        <p>Best regards,<br>The Kri Liya Team</p>
      </div>
    `,
    text: `Hi ${ownerName}, Reminder: ${renterName} is scheduled to return ${itemTitle} today.`,
  }),
};
