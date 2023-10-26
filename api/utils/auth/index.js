const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

//Asi se pueden usar varias estrategias

passport.use(LocalStrategy);
passport.use(JwtStrategy);



