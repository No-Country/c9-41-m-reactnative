export default async function registerSubmit (values) {
  const { confirmPassword, ...newUser } = values
  try {
    const response = await fetch('https://nocountry.onrender.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'include',
      body: JSON.stringify(newUser)
    })
    const json = await response.json()
    return json
  } catch (e) {
    console.error(e)
  }
}
