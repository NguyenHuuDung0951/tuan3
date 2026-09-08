import CartScreen from '@/components/CartScreen';
import LoginByUseReducer from '@/components/LoginByUseReducer';
import { View } from 'react-native';
export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}> 
      {/* <CounterScreen /> */}
      {/* <FormLogin /> */}
      {/* <TimerScreen /> */}
      {/* <FollowStatus /> */}
      {/* <ThemeByUseContext /> */}
      {/* <UserSwithByUseContext /> */}
      <CartScreen />
      <LoginByUseReducer />
    </View>
  ); 
}
