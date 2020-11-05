import React from 'react';
import { View, Text, Button, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Mybutton from './components/Mybutton';

import{ AuthContext } from './components/context';


const HomeScreen = ({navigation}) => {

  const { signOut } = React.useContext(AuthContext);

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={{ flex: 1, marginTop: 200 }}>
        <StatusBar backgroundColor='#c24908' barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <Mybutton
            title="Catatan Baru"
            customClick={() => navigation.navigate('NewContact')}
          />
          <Mybutton
            title="Update Catatan"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View Catatan"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All Catatan"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Hapus Catatan"
            customClick={() => navigation.navigate('Delete')}
          />
          <TouchableOpacity onPress={() => {signOut()}}>
            <Text style={{ fontSize: 16, paddingTop: 60, textAlign: 'center', color: 'grey' }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
