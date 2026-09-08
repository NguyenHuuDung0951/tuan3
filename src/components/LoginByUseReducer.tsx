import { useReducer, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';


const initialState = {
  email: '',
  password: '',
  error: '',
};
function handleLogin(email: string, password: string){
    if (email.includes('@') && password.length >= 6) {
        return true;
    }
    return false;
}
const [submit, isSubmitting] = useState(false);
const FormLogin = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleLogin = () => {
    if (!state.email || !state.password) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Vui lòng nhập đầy đủ thông tin',
      });
      return;
    }

    dispatch({ type: 'SET_ERROR', payload: '' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng nhập hệ thống</Text>
        <TextInput
        value={state.email}
        onChangeText={text =>
            dispatch({ type: 'SET_EMAIL', payload: text })
        }
        placeholder="Email"
        />

        <TextInput
        value={state.password}
        onChangeText={text =>
            dispatch({ type: 'SET_PASSWORD', payload: text })
        }
        placeholder="Mật khẩu"
        secureTextEntry
        />
        {state.error ? <Text>{state.error}</Text> : null}

        <Button title="Đăng nhập" onPress={handleLogin} />
        <Button title="Đặt lại" onPress={() => dispatch({ type: 'RESET' })} />

    </View>
  );
};

function formReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload, error: '' };

    case 'SET_PASSWORD':
      return { ...state, password: action.payload, error: '' };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}
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
  header: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '200'
  }
});

export default FormLogin;
