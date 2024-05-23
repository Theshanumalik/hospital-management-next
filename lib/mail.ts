import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: text,
  });
};

const TEMPLATES = {
  Email_VERIFICATION_OTP: (token: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
              color: #333333;
          }
          p {
              color: #666666;
              margin-bottom: 20px;
          }
          .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
          }
          .btn:hover {
              background-color: #0056b3;
          }
          .warning {
              background-color: #f8d7da;
              color: #721c24;
              padding: 10px;
              border-radius: 5px;
              margin-bottom: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Verify Your Email Address</h1>
          <p>Dear User,</p>
          <p>Thank you for signing up with us! Before you can get started, please verify your email address by clicking the button below:</p>
          <a href="http://localhost:3000/verification?token=${token}" class="btn">Verify Email Address</a>
          <div class="warning">
              <strong>Important:</strong> Please note that your account is not fully active until you verify your email address. 
              If you did not sign up for our service, please ignore this email.
          </div>
          <p>If you're having trouble clicking the "Verify Email Address" button, copy and paste the following URL into your web browser:</p>
          <p><em>http://localhost:3000/verification?token=${token}</em></p>
          <p>Thank you,<br>Your Company Name</p>
      </div>
  </body>
  </html>
    `,
};

export { TEMPLATES, sendMail };
