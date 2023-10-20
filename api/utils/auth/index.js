const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');

//Asi se pueden usar varias estrategias

passport.use(LocalStrategy);


