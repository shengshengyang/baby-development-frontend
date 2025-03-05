import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function AuthHeader({ navigation }: { navigation: any }) {
    const { user, logout } = useAuth();

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
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginRight: 16,
    },
    authText: {
        fontSize: 16,
        color: '#2f95dc'
    },
});
