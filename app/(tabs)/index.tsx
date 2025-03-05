import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
    return (
        <ThemedView style={styles.container}>
            <Image
                source={require('@/assets/images/baby.png')} // 這裡換成你的寶寶圖片路徑
                style={styles.babyImage}
                resizeMode="contain"
            />
            <View style={styles.textContainer}>
                <ThemedText type="title" style={styles.titleText}>
                    寶寶成長
                </ThemedText>
                <ThemedText style={styles.welcomeText}>
                    歡迎來到寶寶成長紀錄 App！在這裡我們將陪伴您，一起見證寶寶每一步的可愛蛻變！
                </ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // 垂直置中
        justifyContent: 'center',
        alignItems: 'center',
    },
    babyImage: {
        width: 240,
        height: 240,
        marginBottom: 20,
    },
    textContainer: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    titleText: {
        marginBottom: 8,
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
});
