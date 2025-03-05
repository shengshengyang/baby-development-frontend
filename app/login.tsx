// app/login.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
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
        router.back(); // Go back to previous screen (likely the tabs)
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>登入</Text>
            <TextInput
                style={styles.input}
                placeholder="電子信箱"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="密碼"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title="登入" onPress={handleLogin} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="前往註冊" onPress={() => router.push('/registration')} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f2f2f2',
        flexGrow: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        marginBottom: 12,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
    },
    buttonContainer: {
        marginBottom: 16,
    },
});
