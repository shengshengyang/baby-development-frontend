// app/login.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        const userData = {
            username,
            email,
            role: ['user'],
            token: 'dummy_token',
            babies: [
                {
                    name: '小明',
                    birthDate: '2020-01-01',
                    progresses: [],
                },
            ],
        };
        login(userData);
        router.back(); // 回到前一個頁面
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>登入</Text>

            <TextInput
                style={styles.input}
                placeholder="使用者名稱"
                placeholderTextColor="#9C8D80"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="電子信箱"
                placeholderTextColor="#9C8D80"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="密碼"
                placeholderTextColor="#9C8D80"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>登入</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.registerButton]}
                onPress={() => router.push('/registration')}
            >
                <Text style={styles.buttonText}>前往註冊</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFF6F0', // 溫馨淡粉色背景
        justifyContent: 'center',
    },
    header: {
        fontSize: 32,
        marginBottom: 24,
        textAlign: 'center',
        color: '#5E412F',                 // 溫暖的棕色字體
        fontFamily: 'BubblegumSans-Regular',
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 14,
        borderRadius: 20,                 // 更圓潤
        borderWidth: 1,
        borderColor: '#F5D0C5',           // 淡粉邊框
        marginBottom: 16,
        fontSize: 16,
        fontFamily: 'ComicNeue',          // 預設字體 (可愛風)
        color: '#5E412F',
    },
    button: {
        backgroundColor: '#FFAFA3',       // 粉色主題
        paddingVertical: 14,
        borderRadius: 20,                // 更圓潤
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',             // 些許陰影 (可加可不加)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,                    // Android 陰影
    },
    registerButton: {
        // 如果要區分「登入」與「註冊」按鈕，可改其他顏色或加邊框
        // 這裡示範同顏色
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'ComicNeue',         // 與輸入框一致，或可改成其他字體
    },
});
