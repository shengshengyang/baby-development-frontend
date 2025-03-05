import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Platform, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import CardComponent from '../../components/CardComponent';
import { useTheme } from '@react-navigation/native'; // ✅ 使用主題

export default function Birthday() {
    const [date, setDate] = useState(new Date());
    const [textDate, setTextDate] = useState('');
    const [open, setOpen] = useState(false);
    const { colors } = useTheme(); // ✅ 確保來自 `RootLayout.tsx`

    // ✅ 確保 `style` 是 `TextStyle | ViewStyle`，避免型別錯誤
    const inputStyle = StyleSheet.flatten([
        styles.input,
        { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }
    ]);

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.header, { color: colors.text }]}>請選擇寶寶生日</Text>

            <View style={[styles.dateContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                {Platform.OS === 'web' ? (
                    <input
                        type="date"
                        value={textDate}
                        onChange={(e) => setTextDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        style={inputStyle} // ✅ 使用 `StyleSheet.flatten()`
                    />
                ) : (
                    <>
                        <Text style={[styles.dateText, { color: colors.text }]}>生日: {date.toISOString().split('T')[0]}</Text>
                        <Button title="選擇日期" onPress={() => setOpen(true)} color={colors.primary} />
                    </>
                )}
            </View>

            {Platform.OS !== 'web' && (
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    maximumDate={new Date()}
                    onConfirm={(selectedDate) => {
                        setOpen(false);
                        setDate(selectedDate);
                    }}
                    onCancel={() => setOpen(false)}
                    locale="zh-Hant"
                    title="選擇寶寶生日"
                    confirmText="確認"
                    cancelText="取消"
                />
            )}

            <View style={styles.buttonContainer}>
                <Button title="查詢圖卡" onPress={() => {}} color={colors.primary} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 12,
        textAlign: 'center',
        fontFamily: 'BubblegumSans-Regular',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 12,
    },
    dateText: {
        fontSize: 16,
        fontFamily: 'ComicNeue',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        fontFamily: 'ComicNeue',
    },
    buttonContainer: {
        marginBottom: 16,
    },
});
