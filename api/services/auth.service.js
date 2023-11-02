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
    delete user.dataValues.recoveryToken;
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

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if (!user){
      throw boom.unauthorized('No estas Autorizado Bro');
    }
    const payload = {
      sub: user.id
    };
    const token = jwt.sign(payload, config.jwtRecovery, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: `${user.email}, Recupera tu contraseña`,
      html: `<b>Con este link podras restablecer tu contraseña ---> ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload= jwt.verify(token, config.jwtRecovery);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized('Token no aceptado');
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {recoveryToken: null, password: hash});
      return { message: 'Password changed'}
    } catch (error) {
        throw boom.unauthorized('No estas Autorizado');
    }
  }

  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
    }
    });
    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
