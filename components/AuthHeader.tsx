import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeToggle } from '@/contexts/ThemeContext';

export default function AuthHeader({ navigation }: Readonly<{ navigation: any }>) {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useThemeToggle();
    const isDarkMode = theme === 'dark';

    return (
        <View style={styles.headerContainer}>
            {user ? (
                <TouchableOpacity onPress={() => logout()}>
                    <Text style={styles.authText}>登出</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={styles.authText}>登入/註冊</Text>
                </TouchableOpacity>
            )}

            {/* 主題切換開關 */}
            <Switch
                value={isDarkMode}
                onValueChange={() => {
                    console.log('🛠 點擊主題切換按鈕');
                    toggleTheme();
                }}
                trackColor={{ false: '#D7CCC8', true: '#FFCA28' }}
                thumbColor={isDarkMode ? '#F5E8C7' : '#5D4037'}
                style={styles.switch}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    authText: {
        fontSize: 16,
        color: '#2f95dc',
        marginRight: 10,
    },
    switch: {
        transform: [{ scale: 1.2 }],
    },
});
