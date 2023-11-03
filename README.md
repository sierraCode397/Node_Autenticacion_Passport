# Node_DB_PostgreSQL


## Descripción

Node_DB_PostgreSQL es un servicio de backend hecho con Node y la libreria **EXPRESS** para una escalabilidad mucho mayor, se conecta a una base de datos PostgreSQL. Utiliza el ORM **Sequelize** para hacer las consultas que tu consideres a las tablas de tu Base de datos. Maneja datos y relaciones 1 a 1, 1 a N y N a N (N = Muchos). Ofrece una variedad de endpoints utilizando los métodos CRUD para procesar datos y algunos procesos internos para mejorar la calidad de la respuesta, todo con validaciones en middlewares utilizando la libreria **JOI**.

## Rutas

En todos las rutas cuetas con los diferentes tipos de endpoitns de CRUD [GET, POST, PATCH, DELETE]
Sin embargo, todas las rutas cuentan con un **ENDPOINT** Adicional (GET /:id) para obtener solo un dato en espesifico segun su **ID** y segun su tabla, que te proporcionara informacion exacta de ese Item.

Las rutas disponibles son: 

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

Otras para la Llave secreta que se necesita para la creacion de los Token (Con "JWT"):

> JWT_PASSWORD=''
> JWT_SECRET=''

Y esta para que la aplicacion pueda enviar correos desde un correo que le asignes (Con "nodemailer"). Debe ser una app_password que te proporciona google para acceder a tu gmail desde cualquier dispositivo que tenga esta clave, la puedes encontrar en el apartado de "Verificacion en dos pasos"

> APP_PASSWORD='' 

Tambien una contraseña y correo para crear un usuario por defecto en tu base de datos (Que tendra esa contraseña que le asignes) y para darle a Nodemailer un el correo al que va poder acceder:

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

Sitio Web: [SierraCode397](https://sierracode397.github.io/)
##### Enlace al Repositorio:
Puedes encontrar el código fuente de este proyecto en [GitHub](https://github.com/sierraCode397/Node_Autenticacion_Passport.git).

## Agradecimientos
Este proyecto fue creado en la escuela de Platzi como parte del curso **"Curso de Backend con Node.js: Autenticación con Passport.js y JWT"**.

Asegúrate de tener Node.js y npm instalados en tu sistema antes de ejecutar estos scripts.

¡Gracias por tu interés en este proyecto! Espero que sea una experiencia interesante y satisfactoria.
