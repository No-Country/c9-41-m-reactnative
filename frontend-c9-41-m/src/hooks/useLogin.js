import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { getUserProfile } from '../utils/user'

async function getToken () {
  const token = await SecureStore.getItemAsync('sessionNoCountry')
  return token
}
const useLogin = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    getToken()
      .then(token => {
        if (token) {
          getUserProfile()
            .then((data) => {
              setUser(data.user)
            })
        }
      })
  }, [])
  return { user }
}

export default useLogin
