// app/registration.tsx
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

export default function Registration() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [babyName, setBabyName] = useState('');
    const [babyBirthDate, setBabyBirthDate] = useState('');

    const handleRegistration = () => {
        const userData = {
            username,
            email,
            role: ['user'],
            token: 'dummy_token',
            babies: [
                {
                    name: babyName,
                    birthDate: babyBirthDate,
                    progresses: [],
                },
            ],
        };
        login(userData);
        router.back(); // 回到前一頁 (通常是 Tabs)
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>註冊</Text>

            <TextInput
                style={styles.input}
                placeholder="電子信箱"
                placeholderTextColor="#9C8D80"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="使用者名稱"
                placeholderTextColor="#9C8D80"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="密碼"
                placeholderTextColor="#9C8D80"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Text style={styles.subHeader}>寶寶資料</Text>

            <TextInput
                style={styles.input}
                placeholder="寶寶姓名"
                placeholderTextColor="#9C8D80"
                value={babyName}
                onChangeText={setBabyName}
            />
            <TextInput
                style={styles.input}
                placeholder="寶寶生日 (YYYY-MM-DD)"
                placeholderTextColor="#9C8D80"
                value={babyBirthDate}
                onChangeText={setBabyBirthDate}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegistration}>
                <Text style={styles.buttonText}>註冊</Text>
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
        color: '#5E412F',                   // 溫暖棕色字體
        fontFamily: 'BubblegumSans-Regular', // 主標題字體
    },
    subHeader: {
        fontSize: 20,
        marginVertical: 8,
        textAlign: 'center',
        color: '#5E412F',
        fontFamily: 'ComicNeue',            // 小標 / 段落採用 ComicNeue
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 14,
        borderRadius: 20,                   // 更圓潤
        borderWidth: 1,
        borderColor: '#F5D0C5',             // 淡粉邊框
        marginBottom: 16,
        fontSize: 16,
        fontFamily: 'ComicNeue',
        color: '#5E412F',
    },
    button: {
        backgroundColor: '#FFAFA3',         // 粉色
        paddingVertical: 14,
        borderRadius: 20,                   // 更圓潤
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',                // 輕微陰影
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,                       // Android 陰影
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'ComicNeue',
    },
});
