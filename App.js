import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Diary from './Components/Diary';
import Calendar from './Components/Calendar';
import { Header, Button, Icon } from '@rneui/themed';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Header
          centerComponent={{ text: 'VITAMIN DIARY', style:{ fontSize: 16, color: 'white' }}}
          rightComponent={<CalendarButton />}
        />
      <Stack.Navigator>
        <Stack.Screen name="VITAMINS" component={Diary} />
        <Stack.Screen name="Calendar" component={Calendar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CalendarButton() {
  const navigation = useNavigation();

  return (
    <Button
      onPress={() => navigation.navigate('Calendar')}
      icon={<Icon name='calendar' type='feather' color='#fff' />}
      buttonStyle={{ backgroundColor: 'transparent' }}>
    </Button>
  );
}


