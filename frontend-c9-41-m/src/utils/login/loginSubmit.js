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
    const json = await response.json()
    console.log({ json })
    return json
  } catch (e) {
    console.error(e)
  }
}
