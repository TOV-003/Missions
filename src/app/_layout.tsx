import { Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { msC } from "@/app/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Outfit-Regular": require("@/assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Thin": require("@/assets/fonts/Outfit-Thin.ttf"),
    "Outfit-Light": require("@/assets/fonts/Outfit-Light.ttf"),
    "Outfit-Medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "Outfit-SemiBold": require("@/assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-Bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "Outfit-ExtraBold": require("@/assets/fonts/Outfit-ExtraBold.ttf"),
    "Outfit-Black": require("@/assets/fonts/Outfit-Black.ttf"),
    "Outfit-ExtraLight": require("@/assets/fonts/Outfit-ExtraLight.ttf"),
  });
  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelPosition: "beside-icon",
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#000",
          tabBarActiveBackgroundColor: "#8FD3FF",
          tabBarInactiveBackgroundColor: "#EFF2F4",

          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: msC(2),
            borderTopColor: "black",
            elevation: 0,
            paddingHorizontal: msC(4),
            paddingTop: msC(8),
            height: msC(64),
            paddingBottom: msC(12),
          },
          tabBarItemStyle: {
            borderWidth: msC(2),
            borderColor: "#000",
            marginHorizontal: msC(4),
            marginBottom: msC(8),
          },
          tabBarLabelStyle: {
            fontFamily: "Outfit-Bold",
            fontSize: msC(13),
            textTransform: "uppercase",
          },
          tabBarIconStyle: { display: "none" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="Tasks"
          options={{
            title: "Tasks",
          }}
        />
        <Tabs.Screen
          name="newTask"
          options={{
            title: "New Task",
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
