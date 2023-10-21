const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('./../../../services/user.service');
const service = new UserService();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
  },
  async (email, password, done) =>{
    try {
    const user = await service.findByEmail(email);

    if (!user){ //Son validaciones par algunos errores que pueden ocurrir
      done(boom.unauthorized(), false) // usamos boom para manejar esos errores
    }

    user.password;
    const isMatch = await bcrypt.compare(password, user.password); // El password normal, es el que el cleinet envia en el boddy
//Al igual que todos los datos de la funcion asincrona de LocalStrategy

    if (!isMatch){
      done(boom.unauthorized(), false)
    }

    delete user.dataValues.password;
    done(null, user);

  }catch(error){
    done(error, false);
  }
});

module.exports = LocalStrategy;
