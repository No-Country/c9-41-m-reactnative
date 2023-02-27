import * as SecureStore from 'expo-secure-store'
export default async function loginSubmit (values) {
  const parsedValues = { username: values.email, password: values.password }
  try {
    const response = await fetch('https://nocountry.onrender.com/auth/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'include',
      body: JSON.stringify(parsedValues)
    })
    if (response.status === 401) {
      throw new Error('Email y/o contraseña incorrectos')
    }
    // Obtener la cookie de la respuesta HTTP
    const cookieHeader = response.headers.get('Set-Cookie')
    // console.log(response.headers.get('Set-Cookie'))
    const cookieValue = cookieHeader.split(';')[0].substring(cookieHeader.split(';')[0].indexOf('=') + 1)
    // Almacenar la cookie en SecureStore
    await SecureStore.setItemAsync('sessionNoCountry', cookieValue)
    // const cookie = await SecureStore.getItemAsync('sessionNoCountry')
    // console.log({ cookie })

    const json = await response.json()
    return json
  } catch (e) {
    console.error(e)
    return { error: e.message }
  }
}
