# Node_Autenticacion_Passport


## Descripción

**Node_Autenticacion_Passport** es un servicio de backend hecho con Node y la libreria **EXPRESS** para una escalabilidad mucho mayor, se conecta a una base de datos PostgreSQL. Utiliza el ORM **Sequelize** para hacer las consultas que tu consideres a las tablas de tu Base de datos. Maneja datos y relaciones 1 a 1, 1 a N y N a N (N = Muchos). Ofrece una variedad de endpoints utilizando los métodos CRUD para procesar datos y algunos procesos internos para mejorar la calidad de la respuesta.

Esta App fue creada a partir del proyecto anterior **Node_DB_PostgreSQL** al que puedes acceder [aqui](https://github.com/sierraCode397/Node_DB_PostgreSQL "aqui"). Sin embargo, **Node_Autenticacion_Passport** es una version mas actualizda pues cuenta con dos implementaciones muy destacables: **Autenticacion y Autorizaciones**, implementado con dos librerias de las que aqui encontraras mas informacion: [PassPort.Js](https://www.passportjs.org/docs/ "PassPort.Js") y [JWT(jsonwebtoken)](https://jwt.io/ "JWT(jsonwebtoken)"). Esto quiere decir, que a diferencia de su version anterior ahora deberas crear una cuenta de usuario(cliente) eh **iniciar sesion** con esa cuenta para poder tener acceso al resto de EndPoints de la aplicacion (como en [Node_DB_PostgreSQL](https://github.com/sierraCode397/Node_DB_PostgreSQL "Node_DB_PostgreSQL")), enviando en los **headers** de todas tus demas peticiones al resto de la app un token de autorización que se te otorgara al iniciar sesion. Ademas de contar con funciones como la recuperacion y cambio de contraseña de tu perfil en caso de ser extraviada o expuesta. 

## Rutas

En todos las rutas cuetas con los diferentes tipos de endpoitns de CRUD [GET, POST, PATCH, DELETE]
Sin embargo, todas las rutas cuentan con un **ENDPOINT** Adicional (GET /:id) para obtener solo un dato en espesifico segun su **ID** y segun su tabla, que te proporcionara informacion exacta de ese Item.

Las rutas disponibles son: 

   - Login -> /api/v1/auth/login  usa POST

   **Login** es la ruta donde deberas ingresar tu correo y contraseña para recivir el Token que te permitira acceder al resto de la aplicaion. Recuerda enviar ese Token en los Headers del resto de tus peticiones.

   -  Users -> /api/v1/users

   **Users** cuenta con una relacion 1 a 1 con la tabla "Customers", por lo que si creas un Customer con su Usuario lo veras reflejado en esta ruta.

   -  Customers -> /api/v1/customer

   **Customers** cuenta con una relacion 1 a 1 con la tabla "Users", por lo que si creas un Customer con su usuario lo veras reflejado en esta ruta, sin embargo, si creas un usuario sin su customer no se vera reflejado en esta ruta.
   Tambien **Customers** cuenta con una relacion 1 a N con la tabla "Orders", por lo que cuando agreges una orden deberas especificar a que "Customer" pertenece, mas no se vera reflejada la orden en esta ruta, sino solo en la ruta "Orders".

   -  Categories -> /api/v1/categories

   **Categories** cuenta con una relacion 1 a N con la tabla "Products", por lo que deberas crear los Productos con su categoria. Veras reflejado cuantos productos estan relacionados con una categoria en especifica en esta ruta.

   -  Products -> /api/v1/products

   **Products** cuenta con una relacion N a 1 con la tabla "Categories", por lo que deberas asignar una categoria a cada producto que agreges y veras informacion de la categoria que le asignaste al producto en esta ruta y en la ruta "Categories".
   Tambien **Products** cuenta con una relacion N a N con la tabla "Orders", por lo que utiliza una tabla ternaria llamada **Order-Products**, sin embargo, solo puedes ver a que ordenes esta asignado cada producto desde la ruta **Order-Products** y la ruta "Orders".

   -  Orders -> /api/v1/orders

   **Orders** cuenta con una relacion N a 1 con la tabla "Customers", por lo que al agregar una orden deberas especificar a que customer pertenecera y podras verlo reflejado en esta ruta.
   Tambien **Orders** cuenta con una relacion N a N con la tabla "Products" por lo que se utiliza una tabla ternaria llamada **Order-Products**, sin embargo puedes ver los productos que se han asigando a cada orden en esta misma ruta y en **Order-Products**, asi como a que cliente y usuario pertenece esa orden y que productos ya se asignaron a esa orden del cliente, con el Endpoint **/:id**.

   -  Order-Products -> /api/v1/order-products

   **Order-Products** es una tabla ternaria, que esta relacionada 1 a N con las tablas, "Products" y "Orders" para generar la relacion N a N, aqui deberas especificar a que orden (que ya tiene un usuario y cliente) le vas a asignar que producto y cuantos de estos productos, para asi generar un total del precio y una lista de productos para el usuario.

   - Recovery your password -> /api/v1/auth/recovery  usa POST

   **Recovery your password** es la ruta que debes usar para recuperar tu contraseña en caso de ser extraviada, lo que debes hacer en enviar el Email de tu cuenta. Esto enviara un token de recuperacion (Distinto al token de acceso) para que introduzcas en los parametros de la ruta **change-password**. Ese token, estara en los **Params** de el link que se te envio.

   - Change-password -> /api/v1/auth/change-password  usa POST

   **Change-password** es la ruta donde deberas enviar el token de recuperacion (optenido en el email) y la nueva contraseña que vas a querer. Una vez termines ese proceso, habras cambiado la contraseña de tu cuenta y podras volver a acceder a la aplicacion.

   - Profile -> /api/v1/profile/my-orders  usa GET

   **Profile** es la ruta (unica ruta) donde podras ver las ordenes que tu perfil a generado para tu ID. Para poder acceder a esa informacion solamente es necesario que envies tu Token de Autenticacion (El de inicio de sesion) en los headers de tu peticion y automaticamente te mostrara que ordenes estan "a tu nombre".

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado Node.js y npm en tu sistema. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).

## Instalación desde Terminal

##### 1. Clona este repositorio desde GitHub:

  -  git clone https://github.com/sierraCode397/Node_Autenticacion_Passport.git

##### 2. Navega al directorio de tu aplicación:

-   cd Node_Autenticacion_Passport

##### 3. Instala las dependencias del proyecto:

-  npm install

## Uso

##### Hacer la migracio o la creacion de los modelos(tablas) a la base de datos:

-  npm run migrations:run

##### Para ejecutar la aplicación en un entorno local, utiliza el siguiente comando:

 - npm run dev

##### Para ejecutar la aplicación en producción, utiliza:

- npm run start

La aplicación estará disponible en el puerto 3000 por defecto, pero puede ser configurado.

## Configuración
Crea un archivo **.ENV** en la raíz del proyecto y proporciona las siguientes variables de entorno para la conexión a la base de datos (ya sea local o en la nube):

> DATABASE_URL=''
> DATABASE_LOCAL_URL=''

Otras para la Llave secreta que se necesita para la creacion de los Token (Con "JWT"), simplemente deben ser contraseñas, pero seran usadas paralos tokens:

> JWT_PASSWORD=''
> JWT_SECRET=''

Y esta, para que la aplicacion pueda enviar correos desde un correo que le asignes. En esta API, se contempla que usaras un correo real y por lo tanto se usara ese para enviarte la clave. (Con la libreria "nodemailer") puedes investigar mas en [Documentacion de NodeMailer](http://nodemailer.com/ "Documentacion de NodeMailer"). Debe ser una app_password que te proporciona google para acceder a tu gmail desde cualquier dispositivo que tenga esta clave. La puedes encontrar en el apartado de "Verificacion en dos pasos" en tu cuenta de google:

> APP_PASSWORD='' 

Tambien una contraseña y correo para crear un usuario por defecto en tu base de datos (Que tendra esa contraseña que le asignes y correo) y para darle a Nodemailer un el correo al que va poder acceder para enviar otros:

> AUTH_CORREO=''
> AUTH_PASSWORD=''


Asegúrate de tener una base de datos en ejecución configurada adecuadamente, ya sea mediante Docker u otro servicio externo. Ejecuta la primera migración para crear las tablas en la base de datos.

## Estructura del Proyecto
La aplicación sigue la arquitectura **The Clean Architecture** y se organiza en capas de modelos y servicios. Puedes expandir el proyecto agregando más capas de modelos o servicios según tus necesidades.

## Problemas Comunes
**Problema**: Tratar de acceder a la base de datos cuando esta aún no ha sido creada o ejecutada.

**Solución**: Asegúrate de que tu base de datos se esté ejecutando correctamente antes de iniciar la aplicación.

## Licencia
Este proyecto está bajo la licencia ISC.

## Contacto
**Isaac Luisjuan**

Correo Electrónico: izaack107@gmail.com

Sitio Web: [SierraCode397](https://isaac-luisjuan.vercel.app/)
##### Enlace al Repositorio:
Puedes encontrar el código fuente de este proyecto en [GitHub](https://github.com/sierraCode397/Node_Autenticacion_Passport.git).

## Agradecimientos
Este proyecto fue creado en la escuela de Platzi como parte del curso **"Curso de Backend con Node.js: Autenticación con Passport.js y JWT"**.

Asegúrate de tener Node.js y npm instalados en tu sistema antes de ejecutar estos scripts.

¡Gracias por tu interés en este proyecto! Espero que sea una experiencia interesante y satisfactoria.
