import { useEffect, useState } from 'react'
import { getCart } from '../utils/user/cart'

const useCart = () => {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(null)
  const [loading, isLoading] = useState(false)
  useEffect(() => {
    isLoading(true)
    getCart()
      .then((data) => {
        setCart(data.cart)
        setTotal(data.cart.reduce((acc, curr) => {
          const subtotal = curr.productId.price * curr.quantity
          return acc + subtotal
        }, 0))
      })
      .finally(() => { isLoading(false) })
  }, [])
  const updateCart = (isLoading) => {
    getCart()
      .then((data) => {
        setCart(data.cart)
        setTotal(data.cart.reduce((acc, curr) => {
          const subtotal = curr.productId.price * curr.quantity
          return acc + subtotal
        }, 0))
      })
      .finally(() => { isLoading(false) })
  }
  return { cart, total, updateCart, loading }
}

export default useCart
