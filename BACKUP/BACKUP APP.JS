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
import Login from './Pages/LoginScreen';
import RegisterScreen from './Pages/RegisterScreen';
import AdminScreen from './Pages/AdminScreen';
import AdminUpdate from './Pages/AdminUpdate';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home', //Set Header Title
            headerStyle: {
              backgroundColor: '#221eeb', //Set Header color
            },
            headerLeft: () => {
              return null;
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
            title: 'View Catatan', //Set Header Title
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
            title: 'View All Catatan', //Set Header Title
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
            title: 'Update Catatan', //Set Header Title
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
            title: 'Catatan Baru', //Set Header Title
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
            title: 'Hapus Catatan', //Set Header Title
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
          name="Login"
          component={Login}
          options={{
            title: 'Login', //Set Header Title
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
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: 'Register', //Set Header Title
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
          name="AdminScreen"
          component={AdminScreen}
          options={{
            title: 'Admin Screen', //Set Header Title
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
          name="AdminUpdate"
          component={AdminUpdate}
          options={{
            title: 'Admin Update', //Set Header Title
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