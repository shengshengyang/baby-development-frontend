// Milestone.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FlashCard, getFlashCards } from '@/util/api';
import CardComponent from "@/components/CardComponent";

export default function Milestone() {
    const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
    const [groupedCards, setGroupedCards] = useState<{ [key: number]: FlashCard[] }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFlashCards();
                // 依照 ageInMonths 由小到大排序
                const sortedData = data.toSorted((a, b) => a.ageInMonths - b.ageInMonths);
                setFlashCards(sortedData);
                // 依據 ageInMonths 分組
                const groups = sortedData.reduce((acc: { [key: number]: FlashCard[] }, card) => {
                    const age = card.ageInMonths;
                    if (!acc[age]) {
                        acc[age] = [];
                    }
                    acc[age].push(card);
                    return acc;
                }, {});
                setGroupedCards(groups);
            } catch (error) {
                console.error('取得圖卡資料失敗:', error);
            }
        };
        fetchData();
    }, []);

    // 取得分組後的年齡陣列，並排序
    const ageGroups = Object.keys(groupedCards)
        .map((ageStr) => parseInt(ageStr, 10))
        .sort((a, b) => a - b);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>各年齡層圖卡</Text>
            {ageGroups.map((age) => (
                <View key={age} style={styles.groupContainer}>
                    <Text style={styles.ageLabel}>{age} 個月</Text>
                    {groupedCards[age].map((card) => (
                        // key 屬性依據 flash card 的 id 或其他唯一識別欄位設定
                        <CardComponent key={card.id || card.translations[0].frontText} flashCard={card} />
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF6F0',
        padding: 16,
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        color: '#5E412F',
        fontFamily: 'BubblegumSans-Regular',
        marginBottom: 12,
    },
    groupContainer: {
        marginBottom: 24,
    },
    ageLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5E412F',
        marginBottom: 8,
        marginLeft: 8,
    },
});
