export async function getUserProfile () {
  const response = await fetch('https://nocountry.onrender.com/user/profile', {
    credentials: 'include'
  })
  const user = await response.json()
  return user
}
