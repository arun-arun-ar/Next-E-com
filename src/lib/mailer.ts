import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

//send verification email using a unique token

export const sendVerificationEmail = async (email:string, token:string): Promise<void> =>{
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`;
    try {
      await transporter.sendMail({
        to: email,
        subject: 'Verify your email',
        html: `<p>Click the link below to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`,
      });
    } catch (err) {
      console.error('Email send error:', err);
      throw err;
    }
}