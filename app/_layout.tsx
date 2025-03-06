import {ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {Text, View} from 'react-native';

import {AuthProvider, useAuth} from '@/contexts/AuthContext';
import { ThemeProvider, useThemeToggle } from '@/contexts/ThemeContext';
import AuthHeader from '@/components/AuthHeader';

// 防止閃屏
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    // 字體載入
    const [loaded] = useFonts({
        'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        'ComicNeue': require('../assets/fonts/ComicNeue-Bold.ttf'),
    });

    // 字體載入完成 -> 關閉閃屏
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    // 右上角自訂 Header
    const HeaderRight = () => {
        const navigation = useNavigation();
        return <AuthHeader navigation={navigation} />;
    };

    // **自訂左側標題**：顯示使用者名稱或預設文字
    const HeaderLeft = () => {
        const { user } = useAuth();
        return (
            <View style={{ marginLeft: 16 }}>
                <Text style={{ fontSize: 16, color: '#2f95dc', fontWeight: 'bold' }}>
                    {user ? `${user.username}寶寶` : '寶寶成長記錄'}
                </Text>
            </View>
        );
    };

    // 這邊定義同樣的 fonts
    const fonts = {
        regular: {
            fontFamily: 'ComicNeue',
            fontWeight: '400' as const,
        },
        medium: {
            fontFamily: 'ComicNeue',
            fontWeight: '500' as const,
        },
        bold: {
            fontFamily: 'ComicNeue',
            fontWeight: '700' as const,
        },
        heavy: {
            fontFamily: 'ComicNeue',
            fontWeight: '900' as const,
        },
    };

    // 取得主題狀態
    const { theme } = useThemeToggle();
    const isDarkMode = theme === 'dark';
    // **確保 NavigationThemeProvider 會根據主題變更**
    const [themeState, setThemeState] = useState(isDarkMode);

    useEffect(() => {
        console.log('🌟 Navigation 主題變更:', theme);
        setThemeState(isDarkMode); // **強制觸發 re-render**
    }, [theme]);

    const WarmSunshineTheme = {
        dark: false,
        colors: {
            primary: '#FFB300',
            background: '#FFF3E0',  // 🌟 確保這裡是背景色
            card: '#FFE082',         // 卡片背景色
            text: '#5D4037',
            border: '#D7CCC8',
            notification: '#FFB300',
        },
        fonts,
    };

    const NightStarlightTheme = {
        dark: true,
        colors: {
            primary: '#FFCA28',
            background: '#2E2E4D',  // 🌙 深色背景
            card: '#4A4063',         // 深色卡片
            text: '#F5E8C7',
            border: '#8D7B68',
            notification: '#FFCA28',
        },
        fonts,
    };


    return (
        <AuthProvider>
            <ThemeProvider>
                <NavigationThemeProvider value={isDarkMode ? NightStarlightTheme : WarmSunshineTheme}>
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: true,
                                // ❶ 清空預設標題
                                headerTitle: '',
                                // ❷ 使用自訂左側
                                headerLeft: () => <HeaderLeft />,
                                // ❸ 使用自訂右側 (已存在的 AuthHeader)
                                headerRight: HeaderRight,
                            }}
                        />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                </NavigationThemeProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}
