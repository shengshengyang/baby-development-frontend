import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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

// Dummy milestone cards data per age group:
const milestones: Milestone[] = [
    {
        id: 0,
        category: '0-3個月',
        milestoneId: 1,
        translations: [
            {
                id: 0,
                languageCode: 'zh',
                frontText: '視覺追蹤',
                backText: '開始追蹤移動物體',
                imageUrl: 'https://api.a0.dev/assets/image?text=視覺追蹤&aspect=1:1'
            }
        ]
    },
    {
        id: 1,
        category: '4-6個月',
        milestoneId: 2,
        translations: [
            {
                id: 1,
                languageCode: 'zh',
                frontText: '抓握物品',
                backText: '能抓握小物件',
                imageUrl: 'https://api.a0.dev/assets/image?text=抓握發展&aspect=1:1'
            }
        ]
    },
    // Add more milestone cards for other age groups as needed.
];

export default function MileStonesScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>各年齡層圖卡</Text>
            {milestones.map((card) => (
                <CardComponent key={card.id} milestone={card} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f2f2f2',
    },
    header: {
        fontSize: 20,
        marginBottom: 12,
        textAlign: 'center',
    },
});
