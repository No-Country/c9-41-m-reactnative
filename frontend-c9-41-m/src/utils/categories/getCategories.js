const categories = [
  { name: 'Pasta', id: 1 },
  { name: 'Carnes', id: 2 },
  { name: 'Vegetariano', id: 3 },
  { name: 'Niños', id: 4 },
  { name: 'Celíacos', id: 5 },
  { name: 'Postres', id: 6 },
  { name: 'Bebidas', id: 7 },
  { name: 'Regionales', id: 8 },
  { name: 'Comida Rápida', id: 9 },
  { name: 'Promociones', id: 10 },
  { name: 'Categoría 1', id: 11 },
  { name: 'Categoría 2', id: 12 },
  { name: 'Categoría 3', id: 13 },
  { name: 'Categoría 4', id: 14 }
]

export default async function getCategories () {
  return categories
}
