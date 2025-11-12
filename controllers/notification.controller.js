import { sendEmail, emailTemplates } from "../utils/email.util.js";

export const sendWelcomeEmail = async (req, res) => {
  try {
    const { email, userName } = req.body;

    if (!email || !userName) {
      return res.status(400).json({ msg: "Email and userName are required" });
    }

    const template = emailTemplates.welcome(userName);
    const result = await sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (result.success) {
      return res.status(200).json({ msg: "Welcome email sent successfully" });
    } else {
      return res.status(500).json({ msg: "Failed to send welcome email", error: result.error });
    }
  } catch (error) {
    console.error("Send welcome email error:", error);
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};
export const sendBookingRequestNotification = async (req, res) => {
  try {
    const { ownerEmail, ownerName, itemTitle, renterName, startDate, endDate } = req.body;

    if (!ownerEmail || !ownerName || !itemTitle || !renterName || !startDate || !endDate) {
      return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    const template = emailTemplates.bookingRequest(ownerName, itemTitle, renterName, startDate, endDate);
    const result = await sendEmail({
      to: ownerEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (result.success) {
      return res.status(200).json({ msg: "Booking request email sent successfully", messageId: result.messageId });
    } else {
      return res.status(500).json({ msg: "Failed to send booking request email", error: result.error });
    }
  } catch (error) {
    console.error("Send booking request email error:", error);
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

export const sendBookingConfirmedNotification = async (req, res) => {
  try {
    const { renterEmail, renterName, itemTitle, startDate, endDate } = req.body;

    if (!renterEmail || !renterName || !itemTitle || !startDate || !endDate) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const template = emailTemplates.bookingConfirmed(renterName, itemTitle, startDate, endDate);

    const result = await sendEmail({
      to: renterEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (result.success) {
      return res.status(200).json({ 
        messageId: result.messageId, 
        msg: "Booking confirmed notification sent successfully" 
      });
    } else {
      return res.status(500).json({ msg: "Failed to send notification", error: result.error });
    }

  } catch (error) {
    console.error("Send booking confirmed notification error:", error);
    return res.status(500).json({ 
      msg: "Server error while sending notification", 
      error: error.message 
    });
  }
};
