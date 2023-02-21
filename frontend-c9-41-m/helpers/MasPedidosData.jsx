import { useState } from 'react'
import { MasPedidosCards } from '../src/components/Home/MasPedidosCards'
import { View } from 'react-native'

export const Cards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Pastas de especialidad',
      price: '$1800',
      review: 4.7,
      image:
      '{{uri:\'https://www.recetaslamasia.es/wp-content/uploads/2012/10/foto_plato-equilibrado-scaled.jpg}}'
    },
    {
      id: 2,
      title: 'Work pollo',
      price: '$1650',
      review: 4.5,
      image:
    '{{uri:\'https://www.recetaslamasia.es/wp-content/uploads/2012/10/foto_plato-equilibrado-scaled.jpg}}'
    },
    {
      id: 3,
      title: 'Bife de cerdo',
      price: '$1400',
      review: 4.8,
      image:
    '{{uri:\'https://www.recetaslamasia.es/wp-content/uploads/2012/10/foto_plato-equilibrado-scaled.jpg}}'
    }
  ])

  return (
    <View>
      {cards.map((card) => {
        return (
          <MasPedidosCards
            key={card.id}
            title={card.title}
            price={card.price}
            review={card.review}
            image={card.image}
          />
        )
      })}
    </View>
  )
}
