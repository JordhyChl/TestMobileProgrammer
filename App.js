// https://blog.edafait.com
// https://www.edafait.com

import 'react-native-gesture-handler';

//import * as React from 'react';
import React, { useEffect } from 'react';
import { Button, View, Text, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import HomeScreen from './Pages/HomeScreen';
// import NewContact from './Pages/NewContact';
// import UpdateCatatan from './Pages/UpdateUser';
// import ViewCatatan from './Pages/ViewUser';
// import ViewAllCatatan from './Pages/ViewAllUser';
// import DeleteCatatan from './Pages/DeleteUser';
// import RegisterScreen from './Pages/RegisterScreen';
// import AdminScreen from './Pages/AdminScreen';
// import AdminUpdate from './Pages/AdminUpdate';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './Pages/components/context';
import LoginScreen from './Pages/LoginScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './Pages/MainTabScreen';
// import SupportScreen from './Pages/SupportScreen';
// import SettingsScreen from './Pages/SettingsScreen';
// import BookmarkScreen from './Pages/BookmarkScreen';
import { DrawerContent } from './Pages/DrawerContent';
import RootStackScreen from './Pages/RootStackScreen';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
const App = () => {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    // <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            {/* <Drawer.Screen name="SupportScreen" component={SupportScreen} />
              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} /> */}
          </Drawer.Navigator>
        )
          :
          <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
    // </PaperProvider>

  );
};

export default App;
