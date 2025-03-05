import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useThemeToggle } from '@/contexts/ThemeContext'; // ✅ 改為從 ThemeContext 讀取主題

export default function TabLayout() {
    const { theme } = useThemeToggle(); // ✅ 讀取 `ThemeContext` 的 theme
    const isDarkMode = theme === 'dark';

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[isDarkMode ? 'dark' : 'light'].tint, // ✅ 讓 `tabBarActiveTintColor` 正確更新
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute', // iOS 透明背景
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="birthday"
                options={{
                    title: 'birthday',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="birthday.cake" color={color} />,
                }}
            />
            <Tabs.Screen
                name="milestone"
                options={{
                    title: 'milestone',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.clipboard" color={color} />,
                }}
            />
        </Tabs>
    );
}
