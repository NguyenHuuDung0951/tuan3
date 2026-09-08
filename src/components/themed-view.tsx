import { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type ThemedViewProps = PropsWithChildren<ViewProps> & {
  type?: 'background' | 'backgroundElement';
};

export function ThemedView({ style, type = 'background', ...props }: ThemedViewProps) {
  const theme = useTheme();

  return <View {...props} style={[styles.default, { backgroundColor: theme[type] }, style]} />;
}

const styles = StyleSheet.create({
  default: {
    width: '100%',
  },
});