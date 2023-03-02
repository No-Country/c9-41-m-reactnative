import { useEffect, useState } from 'react'
import { getCart } from '../utils/user/cart'

const useCart = () => {
  const [cart, setCart] = useState([])
  useEffect(() => {
    getCart()
      .then((data) => {
        setCart(data.cart)
      })
  }, [])
  return { cart }
}

export default useCart
