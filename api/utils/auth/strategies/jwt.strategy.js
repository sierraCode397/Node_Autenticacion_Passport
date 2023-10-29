const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('./../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  if (options.jwtFromRequest) {
    return done(null, payload);
  } else {
    return done(new Error('Token JWT no válido'), false);
  }
});

module.exports = JwtStrategy;


