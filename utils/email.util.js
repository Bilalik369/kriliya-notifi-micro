import nodemailer from "nodemailer";

/* =========================
   TRANSPORTER
========================= */
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

/* =========================
   EMAIL LAYOUT (GLOBAL DESIGN)
========================= */
const emailLayout = (title, content) => `
  <div style="
    font-family: Arial, sans-serif;
    background: #f7f7f7;
    padding: 20px;
  ">
    <div style="
      max-width: 600px;
      margin: auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    ">

      <!-- HEADER -->
      <div style="
        background: #F86261;
        color: white;
        padding: 22px;
        text-align: center;
      ">
        <h1 style="margin: 0; font-size: 22px;">
          ${title}
        </h1>
      </div>

      <!-- CONTENT -->
      <div style="
        padding: 25px;
        color: #333;
        line-height: 1.6;
        font-size: 15px;
      ">
        ${content}
      </div>

      <!-- FOOTER -->
      <div style="
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #888;
        border-top: 1px solid #eee;
      ">
        © ${new Date().getFullYear()} Kri Liya. All rights reserved.
      </div>

    </div>
  </div>
`;

/* =========================
   SEND EMAIL FUNCTION
========================= */
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

    console.log("Email sent:", info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email error:", error);

    return { success: false, error: error.message };
  }
};

/* =========================
   EMAIL TEMPLATES
========================= */
export const emailTemplates = {

  /* -------- WELCOME -------- */
  welcome: (userName) => ({
    subject: "Welcome to Kri Liya!",
    html: emailLayout(
      "Welcome 🎉",
      `
        <p>Hi <strong>${userName}</strong>,</p>

        <p>
          Welcome to <strong style="color:#F86261;">Kri Liya</strong> 👋
        </p>

        <p>
          You can now rent items or list your own products easily on our platform.
        </p>

        <div style="
          margin-top: 20px;
          padding: 15px;
          background: #fff3f1;
          border-left: 4px solid #F86261;
          border-radius: 8px;
        ">
          Start exploring and enjoy your experience 🚀
        </div>

        <p style="margin-top: 20px;">
          Best regards,<br/>
          <strong style="color:#F86261;">Kri Liya Team</strong>
        </p>
      `
    ),
    text: `Welcome ${userName} to Kri Liya!`,
  }),

/* -------- BOOKING REQUEST -------- */
  bookingRequest: (ownerName, itemTitle, renterName, startDate, endDate) => ({
    subject: "New Booking Request",
    html: emailLayout(
      "New Booking Request 📦",
      `
        <p>Hi <strong>${ownerName}</strong>,</p>

        <p>
          <strong>${renterName}</strong> wants to rent:
          <strong style="color:#F86261;">${itemTitle}</strong>
        </p>

        <div style="
          margin: 15px 0;
          padding: 12px;
          background: #fff3f1;
          border-radius: 10px;
        ">
          <p><strong>Start:</strong> ${startDate}</p>
          <p><strong>End:</strong> ${endDate}</p>
        </div>

        <p>Please review this request from your dashboard.</p>

        <p style="margin-top: 20px;">
          Best regards,<br/>
          <strong style="color:#F86261;">Kri Liya Team</strong>
        </p>
      `
    ),
    text: `Booking request for ${itemTitle}`,
  }),

/* -------- BOOKING CONFIRMED -------- */
  bookingConfirmed: (renterName, itemTitle, startDate, endDate) => ({
    subject: "Booking Confirmed",
    html: emailLayout(
      "Booking Confirmed ✅",
      `
        <p>Hi <strong>${renterName}</strong>,</p>

        <p>
          Your booking for
          <strong style="color:#F86261;">${itemTitle}</strong>
          is confirmed.
        </p>

        <div style="
          margin: 15px 0;
          padding: 12px;
          background: #eaffea;
          border-left: 4px solid #4CAF50;
          border-radius: 10px;
        ">
          <p><strong>Start:</strong> ${startDate}</p>
          <p><strong>End:</strong> ${endDate}</p>
        </div>

        <p>Please coordinate with the owner.</p>
      `
    ),
    text: `Booking confirmed for ${itemTitle}`,
  }),

/* -------- BOOKING REJECTED -------- */
  bookingRejected: (renterName, itemTitle, reason) => ({
    subject: "Booking Declined",
    html: emailLayout(
      "Booking Declined ❌",
      `
        <p>Hi <strong>${renterName}</strong>,</p>

        <p>
          Your request for <strong>${itemTitle}</strong> was declined.
        </p>

        ${
          reason
            ? `<p><strong>Reason:</strong> ${reason}</p>`
            : ""
        }

        <p>You can explore other items on the platform.</p>
      `
    ),
    text: `Booking declined for ${itemTitle}`,
  }),

/* -------- PAYMENT -------- */
  paymentReceived: (userName, itemTitle, amount) => ({
    subject: "Payment Received",
    html: emailLayout(
      "Payment Received 💰",
      `
        <p>Hi <strong>${userName}</strong>,</p>

        <p>
          We received your payment of
          <strong style="color:#F86261;">${amount}</strong>
          for <strong>${itemTitle}</strong>.
        </p>

        <p>Your booking is now active.</p>
      `
    ),
    text: `Payment received for ${itemTitle}`,
  }),

/* -------- REVIEW -------- */
  reviewReceived: (userName, reviewerName, rating, itemTitle) => ({
    subject: "New Review",
    html: emailLayout(
      "New Review ⭐",
      `
        <p>Hi <strong>${userName}</strong>,</p>

        <p>
          ${reviewerName} left a
          <strong style="color:#F86261;">${rating}-star</strong>
          review for <strong>${itemTitle}</strong>.
        </p>
      `
    ),
    text: `New review received`,
  }),

/* -------- REMINDER -------- */
  reminderCheckIn: (ownerName, itemTitle, renterName, date) => ({
    subject: "Check-in Reminder",
    html: emailLayout(
      "Check-in Today 📦",
      `
        <p>Hi <strong>${ownerName}</strong>,</p>

        <p>
          ${renterName} will pick up
          <strong style="color:#F86261;">${itemTitle}</strong>
          today (${date}).
        </p>
      `
    ),
    text: `Check-in reminder`,
  }),

/* -------- CHECK OUT -------- */
  reminderCheckOut: (ownerName, itemTitle, renterName, date) => ({
    subject: "Check-out Reminder",
    html: emailLayout(
      "Return Today 📦",
      `
        <p>Hi <strong>${ownerName}</strong>,</p>

        <p>
          ${renterName} will return
          <strong style="color:#F86261;">${itemTitle}</strong>
          today (${date}).
        </p>
      `
    ),
    text: `Check-out reminder`,
  }),
};