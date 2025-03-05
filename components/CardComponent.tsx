import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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

interface CardProps {
    milestone: Milestone;
}

export default function CardComponent({ milestone }: CardProps) {
    // Use first translation as display text
    const translation = milestone.translations[0];

    return (
        <View style={styles.card}>
            <Text style={styles.category}>{milestone.category}</Text>
            <Image source={{ uri: translation.imageUrl }} style={styles.image} />
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
