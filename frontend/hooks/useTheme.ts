import { useColorScheme } from "nativewind";

export const useTheme=()=>{
  const {colorScheme}=useColorScheme()
  return{
    isDark:colorScheme==='dark'
  }
} 