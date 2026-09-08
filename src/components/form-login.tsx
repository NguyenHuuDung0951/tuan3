import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

function handleLogin(age: string, name: string) {
  if (!name || !age) {
    Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
    return;
  }

  if (Number(age) < 18) {
    Alert.alert('Thông báo', 'Tuổi phải từ 18 trở lên');
    return;
  }

  Alert.alert('Thành công', `Đăng nhập với: ${name}, ${age}`);
}
const FormLogin = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Vui lòng nhập họ tên"
        value={name}
        onChangeText={setName}
      />
        <TextInput
        style={styles.input}
        placeholder="Vui lòng nhập tuổi"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        />
      <Button title='Login' onPress={() => handleLogin(age, name)} />

      <Text>
          {name ? `Xin chào, ${name}!` : 'Vui lòng nhập họ tên'}
        </Text>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default FormLogin;
