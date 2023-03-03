import { useEffect, useState } from 'react'
import { getAddresses } from '../utils/user/address'

const useAddress = () => {
  const [addresses, setAddresses] = useState([])
  const [loading, isLoading] = useState(false)
  useEffect(() => {
    isLoading(true)
    getAddresses()
      .then((data) => {
        setAddresses(data.addresses)
      })
      .finally(() => { isLoading(false) })
  }, [])
  const updateAddress = () => {
    isLoading(true)
    getAddresses()
      .then((data) => {
        setAddresses(data.addresses)
      })
      .finally(() => { isLoading(false) })
  }
  return { address: addresses[0], loadingAddress: loading, updateAddress }
}

export default useAddress
