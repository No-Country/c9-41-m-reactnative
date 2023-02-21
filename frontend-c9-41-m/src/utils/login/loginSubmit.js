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
    console.log(response.headers.get('set-cookie'))
    const json = await response.json()
    console.log({ json })
    return json
  } catch (e) {
    console.error(e)
    return { error: e.message }
  }
}
