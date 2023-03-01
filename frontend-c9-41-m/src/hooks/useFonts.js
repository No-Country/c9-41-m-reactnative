import * as Font from 'expo-font'

const useFonts = async () =>
  await Font.loadAsync({
    'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('../../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-ExtraBold': require('../../assets/fonts/Nunito-ExtraBold.ttf')
  })

export default useFonts
