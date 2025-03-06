// CardComponent.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FlashCard } from '@/util/api'; // 注意根據實際專案結構調整路徑

interface CardProps {
    flashCard: FlashCard;
}

export default function CardComponent({ flashCard }: Readonly<CardProps>) {
    // 使用第一筆翻譯作為顯示內容
    const translation = flashCard.translations[0];

    // 如果 translation 不存在，返回 null
    if (!translation) {
        return null;
    }

    return (
        <View style={styles.card}>
            <Text style={styles.category}>{flashCard.category}</Text>
            <Text style={styles.age}>月齡: {flashCard.ageInMonths}個月</Text>
            {translation.imageUrl ? (
                <Image source={{ uri: translation.imageUrl }} style={styles.image} />
            ) : null}
            <Text style={styles.frontText}>{translation.frontText}</Text>
            <Text style={styles.backText}>{translation.backText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    category: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    age: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    frontText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    backText: {
        fontSize: 14,
        color: '#555',
    },
});
