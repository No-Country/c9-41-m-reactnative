export async function getCart () {
  const response = await fetch('https://nocountry.onrender.com/user/cart', {
    credentials: 'include'
  })
  const cart = await response.json()
  return cart
}
export async function addItemToCart (data) {
  const response = await fetch('https://nocountry.onrender.com/user/cart', {
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
