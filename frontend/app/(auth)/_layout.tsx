import { Redirect, Stack } from "expo-router"
import { ActivityIndicator, View } from "react-native"
import { useAuthHook } from "@/hooks/useAuthHook"
import { useGuest } from "@/hooks/useGuest"

export default function AuthLayout() {
  const { backendUser, loading } = useAuthHook()
  const {isGuest}=useGuest()

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    )
  }

  if (backendUser && isGuest) {
    return <Redirect href="/(tabs)/home" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}