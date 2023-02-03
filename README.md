# Variables de entorno

## Backend

PORT='3001' => puerto donde estara escuchando el back
DB_URI='mongodb://localhost:27017/noCountry' => direccion para conectar a la base de datos local  
SESSION_SECRET='algunsupersecreto' => clave para la session de usuario

PATH_FRONT='https://auth.expo.io' => dirección URL del front
PATH_BACK='' => direccion del deploy del back

# Rutas

## /auth/login

METHOD: POST => crear usuario localmente (registro de usuarios)
withCredentials: true,
body:

```js
{
  email: string, // obligatorio
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
  "user": {
    "id": "63dc425becbe4e167971cf3a",
    "email": "b@a.a",
    "role": "user"
  }
}
```

cookies:
name: sessionNoCountry / value: "token" => token de sesión

## /auth/signin

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

## /auth/logout

METHOD: GET => deslogear usuario localmente (cerrar sesión)
withCredentials: true,

respuesta:
body:

```json
{
  "message": "Logout successfully"
}
```
