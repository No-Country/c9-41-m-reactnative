export async function getProductsByCategory (categoryId) {
  const response = await fetch('https://nocountry.onrender.com/products')
  const { products } = await response.json()
  return products.filter(({ categories }) => {
    return categories.includes(categoryId)
  })
}
