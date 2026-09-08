import { createContext, useContext, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type ThemeContextValue = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function ThemeByUseContext() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeByUseContext must be used within ThemeContext.Provider');
  }

  const { isDarkMode, toggleTheme } = themeContext;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#222222' : '#ffffff' },
      ]}
    >
      <Text style={{ color: isDarkMode ? '#ffffff' : '#222222' }}>
        {isDarkMode ? 'Chế độ tối' : 'Chế độ sáng'}
      </Text>

      <Button title="Đổi giao diện" onPress={toggleTheme} />
    </View>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(previousMode => !previousMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeByUseContext />
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
