import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Stack, useNavigation} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/contexts/AuthContext';

import { useColorScheme } from '@/hooks/useColorScheme';
import AuthHeader from "@/components/AuthHeader";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const HeaderRight = () => {
        const navigation = useNavigation();
        return <AuthHeader navigation={navigation} />;
    };

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: true,headerRight: HeaderRight }} />
                <Stack.Screen
                    name="LoginScreen"
                />
                <Stack.Screen
                    name="login"
                    options={{
                        title: '登入',
                        presentation: 'modal',
                    }}
                />
                <Stack.Screen
                    name="registration"
                    options={{
                        title: '註冊',
                        presentation: 'modal',
                    }}
                />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
