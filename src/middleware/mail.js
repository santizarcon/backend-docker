import nodemailer from "nodemailer";

export const sendOTP = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "santipahur@gmail.com",
      clientId:
        "1081671590061-adg3kim8ns4d4b4de6lj06ot19vkcrpj.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04AtnLQZ2aCtcCgYIARAAGAQSNwF-L9IrfrTGQDSk-59LDmDpTEJiNpMomVASPxMgCbK_kYRSqbc--MoYf7rLJ8EfDfRUKnjZCKc",
    },
  });

  const mailOptions = {
    from: "Samsoft <noreply@samsoft.com>",
    to: email,
    subject: "Tu OTP",
    text: `Tu OTP es: ${otp}`,
  };

  transporter.sendMail(mailOptions);
};
