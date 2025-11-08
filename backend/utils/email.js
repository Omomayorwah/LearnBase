const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Send welcome email
exports.sendWelcomeEmail = async (user) => {
  const mailOptions = {
    from: 'LernBase Nigeria <noreply@lernbase.ng>',
    to: user.email,
    subject: 'Welcome to LernBase Nigeria!',
    html: `
      <h1>Welcome ${user.name}!</h1>
      <p>Thank you for joining LernBase Nigeria - Your pathway to skills and employment.</p>
      <p>Start learning today and unlock new opportunities!</p>
      <a href="https://app.lernbase.ng">Go to Dashboard</a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email Error:', error);
    return { success: false, error: error.message };
  }
};

// Send certificate email
exports.sendCertificateEmail = async (user, certificate) => {
  const mailOptions = {
    from: 'LernBase Nigeria <noreply@lernbase.ng>',
    to: user.email,
    subject: 'Congratulations! Your Certificate is Ready',
    html: `
      <h1>Congratulations ${user.name}!</h1>
      <p>You have earned: <strong>${certificate.title}</strong></p>
      <p>Verification Code: <code>${certificate.verificationCode}</code></p>
      <p>Download your certificate from your dashboard.</p>
      <a href="https://app.lernbase.ng/certificates">View Certificate</a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email Error:', error);
    return { success: false, error: error.message };
  }
};

