// https://blog.edafait.com
// https://www.edafait.com

import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './Pages/HomeScreen';
import NewContact from './Pages/NewContact';
import UpdateCatatan from './Pages/UpdateUser';
import ViewCatatan from './Pages/ViewUser';
import ViewAllCatatan from './Pages/ViewAllUser';
import DeleteCatatan from './Pages/DeleteUser';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home', //Set Header Title
            headerStyle: {
              backgroundColor: '#221eeb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewCatatan}
          options={{
            title: 'View User', //Set Header Title
            headerStyle: {
              backgroundColor: '#221eeb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllCatatan}
          options={{
            title: 'View Users', //Set Header Title
            headerStyle: {
              backgroundColor: '#221eeb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateCatatan}
          options={{
            title: 'Update User', //Set Header Title
            headerStyle: {
              backgroundColor: '#221eeb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="NewContact"
          component={NewContact}
          options={{
            title: 'New Contact', //Set Header Title
            headerStyle: {
              backgroundColor: '#221eeb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteCatatan}
          options={{
            title: 'Delete User', //Set Header Title
            headerStyle: {
              backgroundColor: '#221eeb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
