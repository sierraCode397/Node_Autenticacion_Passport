"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: 'izaack107@gmail.com',
    pass: 'snmm moia vzlv yjvn'
}
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'alvena.kuhic56@ethereal.email', // sender address
    to: "isaacluisjuan0@gmail.com", // list of receivers
    subject: "Hello isaac ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world? soy isaac y esto es una prueba de envio de correos</b>", // html body
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
