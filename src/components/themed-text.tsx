import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ThemedTextProps = PropsWithChildren<TextProps> & {
  type?: 'default' | 'small';
};

export function ThemedText({ style, type = 'default', ...props }: ThemedTextProps) {
  const theme = useTheme();
  const textStyle: StyleProp<TextStyle> = [styles.default, { color: theme.text }, styles[type], style];

  return <Text {...props} style={textStyle} />;
}

const styles = StyleSheet.create({
  default: {
    fontFamily: Fonts?.sans,
    fontSize: 16,
  },
  small: {
    fontSize: 14,
  },
});