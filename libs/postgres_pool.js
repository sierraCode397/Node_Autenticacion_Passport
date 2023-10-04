const { Pool } = require('pg'); //Hace un await interno
//Lo que permite compartir de forma mucho mas simple
//Los Queris optenidos
const { config } = require('./../config/config');
let URI = '';

if (config.isProd){
  URI = config.dbUrl;
}else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

}

const pool = new Pool({ connectionString: URI});

module.exports = pool;
