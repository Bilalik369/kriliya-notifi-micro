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
