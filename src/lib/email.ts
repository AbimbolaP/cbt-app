import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendAdminStatusEmail(
  email:string,
  name:string,
  isNowAdmin: boolean
){
  const subject = isNowAdmin
  ? "You've been granted Admin access"
  : "Your Admin access has been revoked";

  const message = isNowAdmin 
  ? `
    <p>Hi ${name}, </p>
    <p> Congratulations! You have been made an <strong>Admin</strong> on CBT Examination Software Platform.</p>
    <p>You now have permission to manage questions, users, and other adminsitrative tasks.</p>
    <p>If you didn't expect this change, please contact support immediately.<p>
    <p>--ARIEL CBT TEAM </p>
  `
  : `
    <p>Hi ${name},</p>
    <p>Your <strong>Admin</strong> access has been removed.</p>
    <p>If you think this was a mistake, please reach out to support.</p>
    <p>--ARIEL CBT TEAM</p>
  `

  try {
    await resend.emails.send({
      from: "Admin Portal <no-reply@resend.dev>",
      to: email,
      subject,
      html:message,
    });
    console.log("Email sent successfully to", email);
  } catch(error) {
    console.error("Error sending email:", error);
  }
}