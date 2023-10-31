const UserService = require('./user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const nodemailer = require('nodemailer');

class AuthService {

  async getUser(email, password){
    const user = await service.findByEmail(email);
    if (!user){
      throw boom.unauthorized('Email Incorrecto');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      throw boom.unauthorized('Contraseña Incorrecta');
    }

    delete user.dataValues.password;
    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return{
      user,
      token
    };
  }

  async sendMail(email){
    const user = await service.findByEmail(email);
    if (!user){
      throw boom.unauthorized('No estas Autorizado Bro');
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.email,
        pass: config.appPassword
    }
    });
    await transporter.sendMail({
      from: config.email, // sender address
      to: `${user.email}`, // list of receivers
      subject: `Hello ${user.email}`, // Subject line
      text: "Restablecer contraeña", // plain text body
      html: "<b>Con este link podras restablecer tu contraseña</b>", // html body
    });
    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
