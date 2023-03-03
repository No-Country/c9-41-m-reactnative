export async function getAddresses () {
  const response = await fetch('https://nocountry.onrender.com/user/address', {
    credentials: 'include'
  })
  const cart = await response.json()
  return cart
}
export async function addAddress (data) {
  const response = await fetch('https://nocountry.onrender.com/user/address', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  const json = await response.json()
  return json
}
export async function editAddress (data) {
  const response = await fetch('https://nocountry.onrender.com/user/address', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  const json = await response.json()
  return json
}
