import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../../Screens/AUTH/Login';
import HomeScreen from '../../Screens/HomeScreen';
import Album from '../../Screens/ScreenModules/Album';
import AlbumDetails from '../../Screens/ScreenModules/AlbumDetails';
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Album" component={Album} />
        <Stack.Screen name="AlbumDetails" component={AlbumDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
