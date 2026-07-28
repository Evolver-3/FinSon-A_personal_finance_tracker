import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useAuthHook } from "@/hooks/useAuthHook";

const SSOCallback = () => {
  const router = useRouter();
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const { syncBackendHook } = useAuthHook();

  useEffect(() => {
    const finishLogin = async () => {
      try {
        if (!isLoaded) return;

        if (!isSignedIn) {
          router.replace("/(auth)/Login");
          return;
        }

        const token = await getToken();

        if (!token) {
          throw new Error("No Clerk token found");
        }

        await syncBackendHook(token);

        router.replace("/(tabs)/home");
      } catch (err) {
        console.log("SSO callback error:", err);
        router.replace("/(auth)/Login");
      }
    };

    finishLogin();
  }, [isLoaded, isSignedIn]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
};

export default SSOCallback;