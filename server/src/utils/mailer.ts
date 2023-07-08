import nodemailer from "nodemailer";

const Mailer = async function (options: {
  email: string;
  body: string;
  subject: string;
}) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let mailOptions = {
    from: `"<${process.env.MAIL_USERNAME}> 🎯" <${process.env.MAIL_ADDRESS}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.body, // plain text body
    html: `<div>${options.body}</div>`, // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent %s", info.messageId);
};

export default Mailer;

