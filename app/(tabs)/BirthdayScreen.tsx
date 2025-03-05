import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Platform, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import CardComponent from '../../components/CardComponent';

interface MilestoneTranslation {
    id: number;
    languageCode: string;
    frontText: string;
    backText: string;
    imageUrl: string;
}

interface Milestone {
    id: number;
    category: string;
    milestoneId: number;
    translations: MilestoneTranslation[];
}

// Dummy data array; in real scenarios this could come from an API.
const milestones: Milestone[] = [
    {
        id: 0,
        category: '0-3個月',
        milestoneId: 1,
        translations: [
            {
                id: 0,
                languageCode: 'zh',
                frontText: '認識聲音',
                backText: '開始聽取外界聲音',
                imageUrl: 'https://api.a0.dev/assets/image?text=聽力發展&aspect=1:1',
            },
        ],
    },
    {
        id: 1,
        category: '4-6個月',
        milestoneId: 2,
        translations: [
            {
                id: 1,
                languageCode: 'zh',
                frontText: '翻身',
                backText: '學習翻身與爬行',
                imageUrl: 'https://api.a0.dev/assets/image?text=運動發展&aspect=1:1',
            },
        ],
    },
];

export default function BirthdayScreen() {
    const [date, setDate] = useState(new Date()); // For mobile
    const [textDate, setTextDate] = useState(''); // For web
    const [open, setOpen] = useState(false); // Control picker modal visibility
    const [cards, setCards] = useState<Milestone[]>([]);

    // Calculate age in months from a Date object
    const calculateAgeInMonths = (birthDate: Date): number => {
        const today = new Date();
        let months =
            (today.getFullYear() - birthDate.getFullYear()) * 12 +
            (today.getMonth() - birthDate.getMonth());
        if (today.getDate() < birthDate.getDate()) {
            months--;
        }
        return months < 0 ? 0 : months;
    };

    // Filter milestones based on baby's age
    const findMilestonesForBirthday = () => {
        const birthDate = Platform.OS === 'web' ? new Date(textDate) : date;
        if (isNaN(birthDate.getTime())) {
            alert('請輸入有效日期 (YYYY-MM-DD)');
            return;
        }
        const ageInMonths = calculateAgeInMonths(birthDate);
        console.log(`Baby age in months: ${ageInMonths}`);
        const filtered = milestones.filter((m) => {
            const parts = m.category.split('-');
            if (parts.length !== 2) return false;
            const min = parseInt(parts[0]);
            const max = parseInt(parts[1].replace('個月', ''));
            return ageInMonths >= min && ageInMonths <= max;
        });
        setCards(filtered);
    };

    // Format date for display (YYYY-MM-DD)
    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>請選擇寶寶生日</Text>
            <View style={styles.dateContainer}>
                {Platform.OS === 'web' ? (
                    <input
                        type="date"
                        value={textDate}
                        onChange={(e) => setTextDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]} // 限制最大日期
                        style={{
                            padding: 10,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                            fontSize: 16,
                        }}
                    />
                ) : (
                    <>
                        <Text style={styles.dateText}>生日: {formatDate(date)}</Text>
                        <Button
                            title="選擇日期"
                            onPress={() => setOpen(true)}
                            color="#007AFF"
                        />
                    </>
                )}
            </View>
            {Platform.OS !== 'web' && (
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    maximumDate={new Date()} // Prevent future dates
                    onConfirm={(selectedDate) => {
                        setOpen(false);
                        setDate(selectedDate);
                    }}
                    onCancel={() => setOpen(false)}
                    locale="zh-Hant" // Traditional Chinese
                    title="選擇寶寶生日"
                    confirmText="確認"
                    cancelText="取消"
                />
            )}
            <View style={styles.buttonContainer}>
                <Button
                    title="查詢圖卡"
                    onPress={findMilestonesForBirthday}
                    color="#007AFF"
                />
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContainer}
            >
                {cards.map((card) => (
                    <CardComponent key={card.id} milestone={card} />
                ))}
            </ScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f2f2f2',
        flexGrow: 1,
    },
    header: {
        fontSize: 20,
        marginBottom: 12,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        flex: 1,
        padding: 8,
        fontSize: 16,
        borderWidth: 0, // Remove extra border
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        marginBottom: 16,
    },
    carouselContainer: {
        paddingVertical: 16,
    },
});
