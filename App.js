import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image,View, SafeAreaView, ImageBackground} from 'react-native';

//Navigation
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from './App/Screens/LoginScreen';
import SignUpScreen from './App/Screens/SignUpScreen';
import WelcomeScreen from './App/Screens/WelcomeScreen';
import MainScreen from './App/Screens/MainScreen';
import { Provider } from 'react-redux';
import store from './store/store';
import SearchScreen from './App/Screens/SearchScreen';
import MapDetailScreen from './App/Screens/MapDetailScreen';
import { useEffect } from 'react';
import { getLocationData, initiateDatabase ,initiateDatabase2, initiateLocationDatabase, initiateUserDatabase, initiateUserDatabase2 } from './database/database';
import BookMarkScreen from './App/Screens/BookMarkScreen';
import UserScreen from './App/Screens/UserScreen';
import UserDetailScreen from './App/Screens/UserDetailScreen';
import TestScreen from './App/Screens/TestScreen';
import EmergencyScreen from './App/Screens/EmergencyScreen';
import BuildingInfoScreen from './App/Screens/BuildingInfoScreen';
import AdminScreen from './App/Screens/AdminScreen';
import DummyScreen from './App/Screens/DummyScreen';
import ListBuildingScreen from './App/Screens/ListBuildingScreen';
import AdminMapScreen from './App/Screens/AdminMapScreen';
import EnrollmentProcess from './App/Screens/EnrollmentProcess';
import ProfileScreen from './App/Screens/ProfileScreen';
import ForgotScreen from './App/Screens/ForgotScreen';

export const RootStackParamList = {
   LoginScreen: undefined,
}

const Stack = createNativeStackNavigator()
export default function App() {


const handlePress = () =>{
   console.log('clicked')
}

useEffect(()=>{
  //First Database Table User Info
  initiateUserDatabase()
  initiateUserDatabase2()
  //Second Database Table Location of Building Info
  initiateLocationDatabase()

},[])

 
  return (
     <Provider store={store}>
      <NavigationContainer>
       <Stack.Navigator initialRouteName='Welcome' >
          <Stack.Screen
            name = 'Welcome'
            component={WelcomeScreen}
            options={{
              header: () => {
                 return (
                   <View></View>
                 )
              }
            }}
          />
          <Stack.Screen
            name = 'Login'
            component={LoginScreen}
            options={{
               header : () => {
                 return (
                  <ImageBackground>
                  </ImageBackground>
                 )
               }
            }}
          />
          <Stack.Screen
            name = 'SignUp'
            component={SignUpScreen}
            options={{
              headerTitle: ''
            }}
          />
          <Stack.Screen
            name = 'Main'
            component={TestScreen}
            options={{
              header: () => {
                 <View></View>
              }
            }}
          />
          <Stack.Screen
            name = 'SearchScreen'
            component={SearchScreen}
            options={{
              headerTitle: ''
            }}
          />
             <Stack.Screen
            name = 'MapDetail'
            component={MapDetailScreen}
            options={{
              header: () => {
                 <View></View>
              }
            }}
          />
          <Stack.Screen
            name = 'BookMark'
            component={BookMarkScreen}
            options={{
              header: () => {
                 <View></View>
              }
            }}
          />
          <Stack.Screen
            name = 'User'
            component={UserScreen}
            options={{
              header: () => {
                 <View></View>
              }
            }}
          />
          <Stack.Screen
            name = 'UserDetail'
            component={UserDetailScreen}
            options={{
              header: () => {
                 <View></View>
              }
            }}
          />
          <Stack.Screen
            name = 'Emergency'
            component={EmergencyScreen}
            options={{
              headerTitle: ''
            }}
          />
           <Stack.Screen
            name = 'Profile'
            component={ProfileScreen}
            options={{
              headerTitle: ''
            }}
          />
           <Stack.Screen
            name = 'BuildingInfo'
            component={BuildingInfoScreen}
            options={{
              headerTitle: ''
            }}
          />
            <Stack.Screen
            name = 'Enrollment'
            component={EnrollmentProcess}
            options={{
              headerTitle: ''
            }}
          />
            <Stack.Screen
            name = 'Admin'
            component={AdminScreen}
            options={{
               header : () => {
                 return (
                  <ImageBackground>
                  </ImageBackground>
                 )
               }
            }}
          />
           <Stack.Screen
            name = 'BuildingList'
            component={ListBuildingScreen}
            options={{
              headerTitle: ''
            }}
          />  
          <Stack.Screen
          name = 'AdminMap'
          component={AdminMapScreen}
          options={{
            headerTitle: ''
          }}
        />
          <Stack.Screen
            name = 'ForgotPassword'
            component={ForgotScreen}
            options={{
              headerTitle: ''
            }}
          /> 
       </Stack.Navigator>
     </NavigationContainer>
     </Provider>
  );
}

const styles = StyleSheet.create({
 
});
