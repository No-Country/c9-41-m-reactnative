# Variables de entorno

## Backend

PORT='3001' => puerto donde estara escuchando el back
DB_URI='mongodb://localhost:27017/noCountry' => direccion para conectar a la base de datos local  
SESSION_SECRET='algunsupersecreto' => clave para las sessiones de usuario

NODEMAILER_USUARIO
NODEMAILER_CONTRASENA
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
SECRETO_JWT

PATH_FRONT='https://auth.expo.io' => dirección URL del front
PATH_BACK='https://nocountry.onrender.com' => direccion del deploy del back

# RUTAS

## /auth

### /auth/login

METHOD: POST => crear usuario localmente (registro de usuarios)
withCredentials: true,
body:

```js
{
  email: string, // obligatorio => formato email
  password: string, // obligatorio
  fullName: string, // maximo 25 caracteres
  birthday: DATE,  // 2023-02-22 ( AAAA-MM-DD )
  phoneNumber: number // maximo 12 numeros
}
```

respuesta:
body:

```json
{
  "message": "User created",
  "user": {
    "id": "63dc425becbe4e167971cf3a",
    "email": "a@a.com",
    "role": "user"
  }
}
```

cookies:
name: sessionNoCountry / value: "token" => token de sesión

Se envia un mail de verificacion al email registrado con un token de 1 hora de duración

### /auth/signin

METHOD: POST => logear usuario localmente (iniciar sesión)
withCredentials: true,
body:

```js
{
  username: string, // obligatorio => el email del usuario
  password: string, // obligatorio
}
```

respuesta:
body:

```json
{
  "user": {
    "id": "63dc425becbe4e167971cf3a",
    "email": "b@a.a",
    "role": "user"
  }
}
```

cookies:
name: sessionNoCountry / value: "token" => token de sesión

### /auth/logout

METHOD: GET => deslogear usuario local (cerrar sesión) a traves de cookies
withCredentials: true,
cookies:
name: sessionNoCountry / value: "token" => token de sesión

respuesta:
body:

```json
{
  "message": "Logout successfully"
}
```

### /auth/perfil

METHOD: GET => obtener perfil del usuario
withCredentials: true,

respuesta:
body:

```json
{
  "user": {
    "id": "63f8d18acb1e81b14d74c0f0",
    "username": "a@a.com",
    "role": "superadmin",
    "verified": false,
    "favorites": [],
    "cart": [
      "63f915ad9e4ceac37d7d1dc8",
      "63f915c29e4ceac37d7d1dd3",
      "63f9171fb55be8635faadd9f",
      "63f91a8bb21385a375cac2ea"
    ],
    "addresses": ["63f8d1df95438a72a0436cdc"],
    "orders": [
      "63f915fd9e4ceac37d7d1dde",
      "63f91a53d4e28f0483cd3ffc",
      "63f91a8eb21385a375cac2f2"
    ]
  }
}
```

### /auth/google

METHOD: GET => realizar logeo con google

respuesta:
1 - lleva al prompt de google para elegir cuenta e iniciar sesión
2 - una ves seleccionada la cuenta y otorgados los permisos redirigue a la pagina del front

- si el logeo no es correcto: /auth?fallo=googleLocal

## /categories

### /categories => METHOD GET

respuesta:
body:

```json
{
  "categories": [
    {
      "_id": "63dcfa868b15924c52b362f1",
      "name": "carne",
      "createdAt": "2023-02-03T12:13:58.870Z",
      "updatedAt": "2023-02-03T12:13:58.870Z",
      "__v": 0
    },
    {
      "_id": "63dcfa8c8b15924c52b362f3",
      "name": "vegetariano",
      "createdAt": "2023-02-03T12:14:04.787Z",
      "updatedAt": "2023-02-03T12:14:04.787Z",
      "__v": 0
    }
  ]
}
```

### /categories => METHOD POST

crear categoria => el nombre debe ser unico
withCredentials: true, => el usuario debe estar logueado y ser administrador
body:

```js
{
  name: String; // maximo 20 caracteres
}
```

respuesta:

respuesta:
body:

```json
{
  "category": {
    "name": "pizza",
    "_id": "63dd59d1fce99c82aca31034",
    "createdAt": "2023-02-03T19:00:33.724Z",
    "updatedAt": "2023-02-03T19:00:33.724Z",
    "__v": 0
  }
}
```

### /categories => METHOD PUT

modificar categoria => el nombre debe ser unico
withCredentials: true, => el usuario debe estar logueado y ser administrador
body:

```js
{
  id: ObjectId, // id de la categoria
  name: String; // maximo 20 caracteres
}
```

respuesta:
body:

```json
{
  "category": {
    "_id": "63dcfdc3981b4516a7973b52",
    "name": "cat modificada",
    "createdAt": "2023-02-03T12:27:47.502Z",
    "updatedAt": "2023-02-03T19:37:13.524Z",
    "__v": 0
  }
}
```

### /categories => METHOD DELETE

eliminar categoria
withCredentials: true, => el usuario debe estar logueado y ser administrador
body:

```js
{
  id: ObjectId, // id de la categoria
}
```

respuesta:
body:

```json
{
  "message": "Removed successfully"
}
```

## /products

### /products => METHOD GET

respuesta:
body:

```json
{
  "products": [
    {
      "_id": "63dd0ed70dc08dbbed44580c",
      "name": "hamburguesa triple queso",
      "price": 10.5,
      "description": "hamburguesa con el triple de queso",
      "stock": 100,
      "onSale": false,
      "discount": 0,
      "categories": ["63dcfa868b15924c52b362f1"],
      "active": true,
      "createdAt": "2023-02-03T13:40:39.895Z",
      "updatedAt": "2023-02-03T13:40:39.895Z",
      "__v": 0
    }
  ]
}
```

### /products => METHOD POST

crear producto => el nombre debe ser unico
withCredentials: true, => el usuario debe estar logueado y ser administrador
form con formato => enctype="multipart/form-data"
body:

```js
{
  name: String, // maximo 30 caracteres
  price: Number, // minimo 0
  description: String, // maximo 150 caracteres
  stock: Number, // minimo 0
  onSale: Boolean, // si el producto esta en oferta, default False
  discount: Number, // minimo 0 - maximo 100 => % de descuento del producto
  categories: ObjectId, // id de las categorias
  images: [] // array con los objetos de imagenes a subir
}
```

respuesta:
body:

```json
{
  "product": {
    "name": "otro producto nuevo",
    "price": 10.5,
    "description": "producto nuevo",
    "stock": 100,
    "onSale": false,
    "discount": 0,
    "categories": ["63dcfa868b15924c52b362f1"],
    "active": true,
    "images": [
      {
        "url": "https://res.cloudinary.com/dmfmud5fb/image/upload/v1675722373/restaurantNoCountry/vtfnubm5di1d0fpl7uwe.png",
        "nombre": "restaurantNoCountry/vtfnubm5di1d0fpl7uwe",
        "_id": "63e17e8686e3f30e5ec93874"
      }
    ],
    "_id": "63de97a4ec94603f82291208",
    "createdAt": "2023-02-04T17:36:36.699Z",
    "updatedAt": "2023-02-04T17:36:36.699Z",
    "__v": 0
  }
}
```

### /products => METHOD PUT

modificar producto => el nombre debe ser unico
withCredentials: true, => el usuario debe estar logueado y ser administrador
form con formato => enctype="multipart/form-data"
body:

```js
{
  id: ObjectId, // id del producto a modificar
  name: String, // maximo 30 caracteres
  price: Number, // minimo 0
  description: String, // maximo 150 caracteres
  stock: Number, // minimo 0
  onSale: Boolean, // si el producto esta en oferta, default False
  discount: Number, // minimo 0 - maximo 100 => % de descuento del producto
  categories: [ ObjectId ], // Array con las id de las categorias
  active: Boolean
  images: [], // Array con los objetos de las imagenes a subir
  imagesToDelete: [string, string] // Array con los NAME de las imagenes a eliminar
}
```

respuesta:
body:

```json
{
  {
    "product": {
        "_id": "63de9815ec94603f8229120c",
        "name": "prod nuevo modificado",
        "price": 12,
        "description": "producto nuevo modificado",
        "stock": 90,
        "onSale": true,
        "discount": 10,
        "categories": [
            "63dcfa8c8b15924c52b362f3",
            "63dd59d1fce99c82aca31034"
        ],
        "images": [
          {
            "url": "https://res.cloudinary.com/dmfmud5fb/image/upload/v1675722373/    restaurantNoCountry/vtfnubm5di1d0fpl7uwe.png",
            "nombre": "restaurantNoCountry/vtfnubm5di1d0fpl7uwe",
            "_id": "63e17e8686e3f30e5ec93874"
          }
        ],
        "active": false,
        "createdAt": "2023-02-04T17:38:29.073Z",
        "updatedAt": "2023-02-04T20:32:44.779Z",
        "__v": 0
    }
}
}
```

### /products => METHOD PATCH => Para recuperar producto eliminado previamente

withCredentials: true, => el usuario debe estar logueado y ser administrador
body:

```js
{
  id: ObjectId, // id del producto a recuperar
}
```

respuesta:

```json
{
  "message": "Recovery successfully",
  "product": {
    "_id": "63dd0ed70dc08dbbed44580c",
    "name": "nombre",
    "price": 10.5,
    "description": "descripcion",
    "stock": 100,
    "onSale": false,
    "discount": 0,
    "categories": ["63dcfa868b15924c52b362f1"],
    "active": true,
    "createdAt": "2023-02-03T13:40:39.895Z",
    "updatedAt": "2023-02-07T14:20:43.315Z",
    "__v": 0,
    "images": []
  }
}
```

### /products => METHOD DELETE

eliminar producto => cambio de la propiedad active a "false" (para poder recuperar el producto luego)
withCredentials: true, => el usuario debe estar logueado y ser administrador
body:

```js
{
  id: ObjectId, // id del producto
}
```

respuesta:
body:

```json
{
  "message": "Removed successfully"
}
```

## /products/deleted

METHOD: GET
withCredentials: true, => el usuario debe estar logueado y ser administrador

respuesta:

```json
{
  "products": [
    {
      "_id": "63ef3866c7debaa561101283",
      "name": "1",
      "price": 1,
      "description": "1",
      "images": [],
      "stock": 1,
      "onSale": false,
      "discount": 0,
      "sales": 2,
      "categories": ["63dd59d1fce99c82aca31034", "63dcfa868b15924c52b362f1"],
      "active": false,
      "createdAt": "2023-02-17T08:18:46.845Z",
      "updatedAt": "2023-02-19T23:17:08.980Z",
      "__v": 0
    }
  ]
}
```

## /user

### /user/favorites

#### METHOD: GET

withCredentials: true, => el usuario debe estar logueado con session activa

respuesta:

```json
{
  "favorites": []
}
```

#### METHOD POST

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
  productId: ObjectId, // id del producto
}
```

respuesta:

```json
{
  "user": {
    "id": "63e138bc2bad9feb99ecd529",
    "username": "a@a.com",
    "role": "user",
    "verified": true,
    "favorites": ["63de97a4ec94603f82291208"],
    "cart": []
  }
}
```

#### METHOD DELETE

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
  productId: ObjectId, // id del producto
}
```

respuesta:

```json
{
  "user": {
    "id": "63e138bc2bad9feb99ecd529",
    "username": "a@a.com",
    "role": "user",
    "verified": true,
    "favorites": [],
    "cart": []
  }
}
```

### /user/cart

#### METHOD GET => obtener los productos en el carrito

withCredentials: true, => el usuario debe estar logueado con session activa

respuesta:

```json
{
  "cart": []
}
```

#### METHOD POST => agregar producto al carrito

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
    productId: ObjectId, // id del producto
    quantity: Number // Cantidad del producto a agregar.. min 1
}
```

respuesta:

```json
{
  "user": {
    "id": "63e138bc2bad9feb99ecd529",
    "username": "a@a.com",
    "role": "user",
    "verified": true,
    "favorites": [],
    "cart": ["63e13d15d2f2eed6917fc277"]
  }
}
```

#### METHOD PUT => modificar cantidad del producto en el carrito

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
    cartItemId: ObjectId, // id del CARRITO
    quantity: Number // Cantidad del producto a agregar.. min 1
}
```

respuesta:

```json
{
  "cartItem": {
    "_id": "63e13d15d2f2eed6917fc277",
    "quantity": 5,
    "productId": "63de978a0fcf5b832802f7b5",
    "userId": "63e138bc2bad9feb99ecd529",
    "__v": 0
  }
}
```

#### METHOD DELETE => eliminar producto del carrito

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
    cartItemId: ObjectId, // id del CARRITO
}
```

respuesta:

```json
{
  "user": {
    "id": "63e138bc2bad9feb99ecd529",
    "username": "a@a.com",
    "role": "user",
    "verified": false,
    "favorites": [],
    "cart": []
  }
}
```

### /user/profile

#### METHOD GET => obtener el perfil del usuario logeado

withCredentials: true, => el usuario debe estar logueado con session activa

respuesta:

```json
{
  "user": {
    "id": "63e03a5ad5afd6534aadb3b1",
    "username": "a@a.com",
    "role": "user",
    "verified": false,
    "favorites": [],
    "cart": []
  }
}
```

#### METHOD PUT => modificar el perfil del usuario logeado

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
    fullName: string, // maximo 25 caracteres
    birthday: DATE,  // 2023-02-22 ( AAAA-MM-DD )
    phoneNumber: number // maximo 12 numeros
}
```

respuesta:

```json
{
  "user": {
    "id": "63e03a5ad5afd6534aadb3b1",
    "username": "a@a.com",
    "fullName": "Nombre Apellido",
    "phoneNumber": 1234567890,
    "birthday": "2023-02-09T00:00:00.000Z",
    "role": "superadmin",
    "verified": false,
    "favorites": [],
    "cart": ["63e03d83f3ea01cc8bea0336"]
  }
}
```

#### METHOD DELETE => permite eliminar completamente la cuenta del usuario logeado

withCredentials: true, => el usuario debe estar logueado con session activa

respuesta:

```json
{
  "mesagge": "Removed complete"
}
```

### /user/address

#### METHOD GET => obtener direcciones del usuario logueado

withCredentials: true, => el usuario debe estar logueado con session activa

respuesta:

```json
{
  "addresses": [
    {
      "_id": "63f7c83b2951de23f1a1e703",
      "street": "calle",
      "number": 10,
      "city": "ciudad",
      "province": "provincia",
      "zipCode": "1234",
      "detail": "algun detalle",
      "contact": 1234567890,
      "userId": "63f7a657da48fa328b046b66",
      "__v": 0
    }
  ]
}
```

#### METHOD POST => crear dirección

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
    street: string,
    number: number,
    city: string,
    province: string,
    zipCode: number,
    detail: string,
    contact: number,
    userId: objectId
}
```

respuesta:

```json
{
  "address": {
    "street": "calle",
    "number": 10,
    "city": "ciudad",
    "province": "provincia",
    "zipCode": "1234",
    "detail": "algun detalle",
    "contact": 1234567890,
    "userId": "63f7a657da48fa328b046b66",
    "_id": "63f7c83b2951de23f1a1e703",
    "__v": 0
  }
}
```

#### METHOD PUT => modificar direccion del usuario

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
    id: objectId, // => id de la direccion a modificar
    street: string,
    number: number,
    city: string,
    province: string,
    zipCode: number,
    detail: string,
    contact: number,
}
```

respuesta:

```json
{
  "address": {
    "_id": "63f7c83b2951de23f1a1e703",
    "street": "calle mod",
    "number": 20,
    "city": "ciudad mod",
    "province": "provincia mod",
    "zipCode": "9876",
    "detail": "algun detalle mod",
    "contact": 9876543210,
    "userId": "63f7a657da48fa328b046b66",
    "__v": 0
  }
}
```

#### METHOD DELETE => eliminar direccion de usuario

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
    id: objectId, // => id de la direccion a eliminar
}
```

respuesta:

```json
{
  "mesagge": "Deleted complete"
}
```

### /user/sales

#### METHOD GET => obtener las ventas del usuario logeado

withCredentials: true, => el usuario debe estar logueado con session activa

respuesta:

```json
{
  "sales": []
}
```

### /user/sales/:saleId



respuesta:

```json
{
  "sales": {
    "_id": "63f91a8eb21385a375cac2f2",
    "total": 3,
    "shippingMethod": "delivery",
    "paymentMethod": "MercadoPago",
    "paymentStatus": "pending",
    "shippingStatus": "pending",
    "shippingAddress": "calle 10, ciudad, 1234, provincia. detalle: algun detalle. contacto: 1234567890.",
    "orderItems": [
      {
        "_id": "63f91a8eb21385a375cac2f4",
        "name": "3",
        "quantity": 1,
        "price": 3,
        "productId": "63ef3af97c27b155e3e76b68",
        "orderId": "63f91a8eb21385a375cac2f2",
        "__v": 0
      }
    ],
    "userId": "63f8d18acb1e81b14d74c0f0",
    "__v": 1
  }
}
```

#### METHOD GET => obtener las ventas del usuario logeado

withCredentials: true, => el usuario debe estar logueado con session activa

respuesta:

```json
{
  "sale": {}
}
```

## /admin

### /admin/users => listar todos los usuarios

withCredentials: true, => el usuario debe ser admin con session activa

respuesta:

```json
{
  "users": [
    {
      "_id": "63e54a28a0f3982d0e3622a4",
      "email": "a@a.com",
      "active": true,
      "role": "superadmin",
      "verified": false,
      "createdIn": "local",
      "favorites": [],
      "cart": [],
      "username": "a@a.com",
      "createdAt": "2023-02-09T19:31:52.504Z",
      "updatedAt": "2023-02-09T19:50:31.299Z",
      "__v": 0,
      "birthday": "2023-02-18T00:00:00.000Z",
      "fullName": "nombresirijillo",
      "phoneNumber": 123456789012
    },
    {
      "_id": "63e5764039ed1c7904bbd085",
      "email": "b@b.com",
      "active": true,
      "role": "user",
      "verified": false,
      "createdIn": "local",
      "favorites": [],
      "cart": [],
      "username": "b@b.com",
      "createdAt": "2023-02-09T22:40:01.005Z",
      "updatedAt": "2023-02-09T22:40:01.005Z",
      "__v": 0
    }
  ]
}
```

### /admin/user/:userid

#### METHOD: GET obtener detalles de un usuario

METHOD: GET
withCredentials: true, => el usuario debe ser admin con session activa
params => id del usuario a consultar

respuesta:

```json
{
  "userDetails": {
    "_id": "63e54a28a0f3982d0e3622a4",
    "email": "a@a.com",
    "active": true,
    "role": "superadmin",
    "verified": false,
    "createdIn": "local",
    "favorites": [],
    "cart": [],
    "username": "a@a.com",
    "createdAt": "2023-02-09T19:31:52.504Z",
    "updatedAt": "2023-02-09T19:50:31.299Z",
    "__v": 0,
    "birthday": "2023-02-18T00:00:00.000Z",
    "fullName": "nombresirijillo",
    "phoneNumber": 123456789012
  }
}
```

#### METHOD: PUT modificar rol del usuario

METHOD: PUT
withCredentials: true, => el usuario debe ser "superadmin" con session activa
params => id del usuario a consultar
body:

```js
{
  role: string; // rol a asignar "user" o "admin"
}
```

respuesta:

```json
{
  "user": {
    "_id": "63e5764039ed1c7904bbd085",
    "email": "b@b.com",
    "active": true,
    "role": "admin",
    "verified": false,
    "createdIn": "local",
    "favorites": [],
    "cart": [],
    "username": "b@b.com",
    "createdAt": "2023-02-09T22:40:01.005Z",
    "updatedAt": "2023-02-11T21:09:31.423Z",
    "__v": 0
  }
}
```

#### METHOD: PATCH para recuperar usuario baneado

METHOD: PATCH
withCredentials: true, => el usuario debe ser "superadmin" con session activa
params => id del usuario a consultar
body:

respuesta:

```json
{
  "recoveredUser": {
    "_id": "63ef7072841c718a3709a67e",
    "email": "c@c.com",
    "active": true,
    "role": "user",
    "verified": false,
    "createdIn": "local",
    "favorites": [],
    "cart": [],
    "username": "c@c.com",
    "createdAt": "2023-02-17T12:17:54.409Z",
    "updatedAt": "2023-02-17T12:26:26.941Z",
    "__v": 0
  }
}
```

#### METHOD: DELETE para BANEAR un usuario (borrado logico)

METHOD: DELETE
withCredentials: true, => el usuario debe ser "superadmin" con session activa
params => id del usuario a consultar

respuesta:

```json
{
  "bannedUser": {
    "_id": "63ef7072841c718a3709a67e",
    "email": "c@c.com",
    "active": false,
    "role": "user",
    "verified": false,
    "createdIn": "local",
    "favorites": [],
    "cart": [],
    "username": "c@c.com",
    "createdAt": "2023-02-17T12:17:54.409Z",
    "updatedAt": "2023-02-17T12:27:13.458Z",
    "__v": 0
  }
}
```

### /admin/sales

#### METHOD GET => obtener todas las ventas

withCredentials: true, => el usuario debe ser "admin" con session activa

respuesta

```json
{
  "sales": []
}
```

### /admin/sales/:saleId

#### METHOD GET => obtener detalles de la venta

withCredentials: true, => el usuario debe ser "admin" con session activa

respuesta

```json
{
  "sale": {}
}
```

## /shop

### /shop/search

METHOD: GET
query: find => ?find=loquesebusque

respuesta:

```json
{
  "products": [
    {
      "_id": "63ef3866c7debaa561101283",
      "name": "1",
      "price": 1,
      "description": "1",
      "images": [],
      "stock": 1,
      "onSale": false,
      "discount": 0,
      "sales": 0,
      "categories": ["63dcfa868b15924c52b362f1"]
    },
    {
      "_id": "63ef386fc7debaa561101287",
      "name": "2",
      "price": 2,
      "description": "2",
      "images": [],
      "stock": 2,
      "onSale": false,
      "discount": 0,
      "sales": 0,
      "categories": ["63dcfa868b15924c52b362f1"]
    }
  ]
}
```

### /shop/filtercategory?filter=categoryid

METHOD: GET
query: filter => ?filter=id => se debe pasar un string con los ID de la categoria separados por una coma (,) ej ?filter=idcat1,idcat2,idcat3

respuesta:

```json
{
  "products": [
    {
      "_id": "63ef3866c7debaa561101283",
      "name": "1",
      "price": 1,
      "description": "1",
      "images": [],
      "stock": 1,
      "onSale": false,
      "discount": 0,
      "sales": 2,
      "categories": ["63dd59d1fce99c82aca31034", "63dcfa868b15924c52b362f1"],
      "active": true,
      "createdAt": "2023-02-17T08:18:46.845Z",
      "updatedAt": "2023-02-17T08:58:08.278Z",
      "__v": 0
    },
    {
      "_id": "63ef386fc7debaa561101287",
      "name": "2",
      "price": 2,
      "description": "2",
      "images": [],
      "stock": 2,
      "onSale": false,
      "discount": 0,
      "sales": 1,
      "categories": ["63dd59d1fce99c82aca31034"],
      "active": true,
      "createdAt": "2023-02-17T08:18:55.564Z",
      "updatedAt": "2023-02-17T08:48:18.631Z",
      "__v": 0
    }
  ]
}
```

### /shop/bestsellers

METHOD: GET

respuesta:

```json
{
  "bestSellers": [
    {
      "_id": "63ef386fc7debaa561101287",
      "name": "2",
      "price": 2,
      "description": "2",
      "images": [],
      "stock": 2,
      "onSale": false,
      "discount": 0,
      "categories": ["63dd59d1fce99c82aca31034"]
    },
    {
      "_id": "63ef3866c7debaa561101283",
      "name": "1",
      "price": 1,
      "description": "1",
      "images": [],
      "stock": 1,
      "onSale": false,
      "discount": 0,
      "categories": ["63dd59d1fce99c82aca31034", "63dcfa868b15924c52b362f1"]
    }
  ]
}
```

## nuevo titulo
