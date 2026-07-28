import {useFonts} from 'expo-font'

export const useAppFonts=()=>{
  const [fontsLoaded]=useFonts({
    "Sans-Bold":require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Sans-Extrabold":require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Sans-Light":require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Sans-Medium":require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Sans-Regular":require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Sans-Semibold":require("../assets/fonts/PlusJakartaSans-SemiBold.ttf")
  })

  return fontsLoaded
}