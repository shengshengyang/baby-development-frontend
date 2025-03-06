import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeToggle } from '@/contexts/ThemeContext';
import { loginUser, setAcceptLanguage } from '@/util/api'; // 根據專案結構調整路徑

export default function AuthHeader({ navigation }: { navigation: any }) {
    const { user, login, logout } = useAuth();
    const { theme } = useThemeToggle();
    const isDarkMode = theme === 'dark';

    // 控制 modal 顯示與否
    const [modalVisible, setModalVisible] = useState(false);
    // 登入用的 email 與 password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // 語言狀態，預設為英文 "en"
    const [language, setLanguage] = useState<'en' | 'zh_TW'>('en');

    // 切換語言
    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'zh_TW' : 'en';
        setLanguage(newLang);
        setAcceptLanguage(newLang); // 更新 API 中的 acceptLanguage
    };

    // 處理登入邏輯
    const handleLogin = async () => {
        setErrorMsg('');
        try {
            const userData = await loginUser(email, password);
            login(userData);
            setModalVisible(false);
        } catch (error) {
            console.error('登入錯誤:', error);
            setErrorMsg('登入失敗，請確認帳號與密碼');
        }
    };

    return (
        <View style={styles.headerContainer}>
            {user ? (
                <TouchableOpacity onPress={() => logout()}>
                    <Text style={styles.authText}>登出</Text>
                </TouchableOpacity>
            ) : (
                // 點擊後顯示登入 modal
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.authText}>登入/註冊</Text>
                </TouchableOpacity>
            )}

            {/* 語言切換按鈕 */}
            <TouchableOpacity onPress={toggleLanguage}>
                <Text style={styles.langText}>
                    {language === 'en' ? 'English' : '中文'}
                </Text>
            </TouchableOpacity>

            {/* 登入 Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>登入</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
                        <View style={styles.buttonRow}>
                            <Button title="取消" onPress={() => setModalVisible(false)} />
                            <Button title="登入" onPress={handleLogin} />
                        </View>
                    </View>
                </View>
            </Modal>
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
    langText: {
        fontSize: 16,
        color: '#2f95dc',
        marginRight: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
