import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  try {
    // ✅ Create transporter INSIDE function
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Using EMAIL:", process.env.EMAIL_USER);
    console.log("Using PASS:", process.env.EMAIL_PASS);

    await transporter.sendMail({
      from: `"Mess Management" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP Verification",
      text: `
Hello,

Your OTP is: ${otp}

Valid for 5 minutes.
`,
      html: `
        <h2>OTP Verification</h2>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes</p>
      `,
    });

    console.log("OTP email sent successfully");
  } catch (err) {
    console.log("Email sending error:", err);
    throw err;
  }
};