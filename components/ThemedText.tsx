import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
                             style,
                             lightColor,
                             darkColor,
                             type = 'default',
                             ...rest
                           }: ThemedTextProps) {
  // 假設 useThemeColor 可以依據 light/dark mode 切換文字顏色
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
      <Text
          style={[
            { color },
            type === 'default' && styles.default,
            type === 'title' && styles.title,
            type === 'defaultSemiBold' && styles.defaultSemiBold,
            type === 'subtitle' && styles.subtitle,
            type === 'link' && styles.link,
            style,
          ]}
          {...rest}
      />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    // 這裡使用 ComicNeue 作為 default
    fontFamily: 'ComicNeue',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    // 若需微調字體「粗細」，可手動分別載入 Bold 檔或直接使用 Regular
    fontFamily: 'ComicNeue',
    fontWeight: '600', // 或使用對應 Bold 檔
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '700',
    // 使用 BubblegumSans-Regular 作為 title
    fontFamily: 'BubblegumSans-Regular',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '400',
    // 使用 PatrickHand-Regular
    fontFamily: 'PatrickHand-Regular',
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: 'underline',
    // 使用 AnnieUseYourTelescope-Regular
    fontFamily: 'AnnieUseYourTelescope-Regular',
  },
});
