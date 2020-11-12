//import React from 'react';
import React, { useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
import{ AuthContext } from './components/context';

var db = openDatabase({ name: 'UserDatabase.db' });
const HomeScreen = ({navigation}) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_catatan'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_catatan', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_catatan(catatan_id INTEGER PRIMARY KEY AUTOINCREMENT, catatan_judul VARCHAR(255), catatan_desc VARCHAR(255), catatan_waktu VARCHAR(255), catatan_interval VARCHAR(255), catatan_lampiran VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);

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
