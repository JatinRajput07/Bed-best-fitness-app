const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, otp) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.otp = otp;
    this.from = `Fitness-App <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.DEV_EMAIL_HOST,
      port: process.env.DEV_EMAIL_PORT,
      auth: {
        user: process.env.DEV_EMAIL_USERNAME,
        pass: process.env.DEV_EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on an ejs template
    const html = await ejs.renderFile(`${__dirname}/../views/email/${template}.ejs`, {
      name: this.firstName,
      otp: this.otp,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html), // Use `convert` instead of `fromString`
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send(
      'otp_email',
      'Your password reset OTP (valid for only 10 minutes)'
    );
  }

  async welcome() {
    await this.send(
      'welcome',
      'Welcom to Fitness App .This is Account verification OTP'
    );
  }

};
