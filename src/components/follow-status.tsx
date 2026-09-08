import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function FollowStatus() {
    const [isConnected, setIsConnected] = useState(false);
    const [theme, setTheme] = useState('light');
    const [message, setMessage] = useState('Chưa kết nối');

  useEffect(() => {
    setMessage(isConnected ? 'Thiết bị đã kết nối' : 'Thiết bị đã ngắt kết nối');
    setTheme(previousTheme => (previousTheme === 'light' ? 'dark' : 'light'));
  }, [isConnected]);

  const isDarkTheme = theme === 'dark';

    return (
     <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
    <Switch value={isConnected} onValueChange={setIsConnected} />
    <Text style={isDarkTheme ? styles.darkText : styles.lightText}>{message}</Text>
    <Text style={isDarkTheme ? styles.darkText : styles.lightText}>Chủ đề hiện tại: {theme}</Text>
       </View>
     );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#333030',
  },
  lightText: {
    color: '#0c08f5',
  },
  darkText: {
    color: '#c70909',
  },
  title: {
    fontSize: 24,
  },
});