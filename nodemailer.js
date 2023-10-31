const nodemailer = require("nodemailer");
const { config } = require('./api/config/config');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: config.email,
    pass: config.appPassword
}
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'izaack107@gmail.com', // sender address
    to: "isaacluisjuan0@gmail.com", // list of receivers
    subject: "Hello isaac ✔", // Subject line
    text: "APP_PASSWORD?", // plain text body
    html: "<b>Usando variables de entorno para enviar correos</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main()
