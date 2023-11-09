const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler')
const { logErrors, errorHandler, boomErrorHandler, handleSQLError } = require('./middlewares/error.handler');
const { config } = require('./config/config');
const pg = require('pg')

const app = express();
const port = process.env.PORT || 3000;

let URI = ''

if(config.isProd){
  URI = config.dbUrl;
}else {
  URI = config.dbLocalUrl
}

const pool = new pg.Pool({
  connectionString: URI
})

app.use(express.json());

const whitelist = ['http://localhost:8080','http://localhost:3000', 'https://isaac-luisjuan.vercel.app', 'https://myapp.co', '*'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
require('./utils/auth/index'); //Node.js busca y carga el módulo ubicado en la ruta especificada
//El módulo se carga en tiempo de ejecución, no en tiempo de compilación.
//puedes acceder a las exportaciones directamente usando la ruta del módulo como un objeto
//Asi: require('./utils/auth/index').autenticarUsuario();

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

/* app.get('/api', (req, res) => {
  res.send('Hola mi server en express  ---   Configuracion: "'+ option.ssl + '" --- Conexion a la Base de datos: '+ URI);
}); */

app.get('/api/ping', async (req, res) => {
  const result = await pool.query('SELECT NOW()')

  const additionalResponse = {
    message:`Conexion a la Base de datos: -----> my_${URI}_more176/postgres@host:3000`
  };

  // Devolver ambas respuestas en un objeto
  const responseData = {
    pingResult: result.rows[0],
    additionalResponse: additionalResponse,
  };

  return res.json(responseData);
});

app.get('/api/ruta-auth', checkApiKey, (req, res) => {
  res.send('Estas Autenticado!!!!');
})

routerApi(app);

app.use(logErrors);
app.use(handleSQLError)
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' +  port);
});
