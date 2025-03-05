import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
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
                imageUrl: 'https://api.a0.dev/assets/image?text=視覺追蹤&aspect=1:1',
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
                frontText: '抓握物品',
                backText: '能抓握小物件',
                imageUrl: 'https://api.a0.dev/assets/image?text=抓握發展&aspect=1:1',
            },
        ],
    },
];

// 取得螢幕寬度來決定每行顯示幾張卡片
const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth > 900 ? 3 : screenWidth > 600 ? 2 : 1;

export default function Milestone() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>各年齡層圖卡</Text>

            <FlatList
                data={milestones}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <CardComponent milestone={item} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF6F0', // 溫馨淡粉色
    },
    header: {
        fontSize: 24,
        marginBottom: 12,
        textAlign: 'center',
        color: '#5E412F', // 溫暖的棕色字體
        fontFamily: 'BubblegumSans-Regular',
    },
    listContainer: {
        justifyContent: 'space-evenly', // 平均分佈
        alignItems: 'center',
        flexWrap: 'wrap', // 讓卡片能夠自動換行
    },
    cardWrapper: {
        flex: 1,
        padding: 10, // 增加間距
        maxWidth: 300, // 限制卡片最大寬度，避免過大
    },
});
