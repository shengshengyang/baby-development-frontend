// app/registration.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
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
        router.back(); // Go back to previous screen (likely the tabs)
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>註冊</Text>
            <TextInput
                style={styles.input}
                placeholder="電子信箱"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="使用者名稱"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="密碼"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text style={styles.subHeader}>寶寶資料</Text>
            <TextInput
                style={styles.input}
                placeholder="寶寶姓名"
                value={babyName}
                onChangeText={setBabyName}
            />
            <TextInput
                style={styles.input}
                placeholder="寶寶生日 (YYYY-MM-DD)"
                value={babyBirthDate}
                onChangeText={setBabyBirthDate}
            />
            <View style={styles.buttonContainer}>
                <Button title="註冊" onPress={handleRegistration} />
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
    subHeader: {
        fontSize: 18,
        marginVertical: 8,
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
