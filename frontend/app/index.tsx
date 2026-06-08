import { Redirect } from "expo-router"
import { ActivityIndicator, View } from "react-native"
import { useAuthContext } from "@/context/AuthContext"

export default function Index() {
  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    )
  }
 
  if (user) {
    return <Redirect href="/(tabs)/home" />
  }

  return <Redirect href="/(auth)/sign-in" />
} 