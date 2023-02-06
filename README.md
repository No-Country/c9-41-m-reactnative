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
  name: string,
  lastname: string,
  birthday: DATE,
  phoneNumber: number,
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
  email: string, // obligatorio => el email del usuario
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

### /products => METHOD POST => a modificar para agregar imagenes

crear producto => el nombre debe ser unico
withCredentials: true, => el usuario debe estar logueado y ser administrador
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
    "_id": "63de97a4ec94603f82291208",
    "createdAt": "2023-02-04T17:36:36.699Z",
    "updatedAt": "2023-02-04T17:36:36.699Z",
    "__v": 0
  }
}
```

### /products => METHOD PUT => a modificar para agregar imagenes

modificar producto => el nombre debe ser unico
withCredentials: true, => el usuario debe estar logueado y ser administrador
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
        "active": false,
        "createdAt": "2023-02-04T17:38:29.073Z",
        "updatedAt": "2023-02-04T20:32:44.779Z",
        "__v": 0
    }
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

## /user

### /user/favorites

#### METHOD: GET

withCredentials: true, => el usuario debe estar logueado con session activa

respuesta:

```json
{
  "message": "Removed successfully"
}
```

#### METHOD POST

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
  productId: "63de97a4ec94603f82291208";
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
  productId: "63de978a0fcf5b832802f7b5";
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

#### METHOD GET

withCredentials: true, => el usuario debe estar logueado con session activa

respuesta:

```json
{
  "cart": []
}
```

#### METHOD POST

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
    productId: "63de978a0fcf5b832802f7b5", // id del producto
    quantity: 2 // Number cantidad del producto
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

#### METHOD PUT

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
    cartItemId: "63e13d15d2f2eed6917fc277", // id del item del carrito
    quantity: 5 // cantidad
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

#### METHOD DELETE

withCredentials: true, => el usuario debe estar logueado con session activa

body:

```js
{
    "cartItemId": "63e03d23f3ea01cc8bea032b"
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
