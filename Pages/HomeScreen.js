//    blog.edafait.com
//    www.edafait.com

import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Mybutton from './components/Mybutton';
//import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = ({ navigation }) => {
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 200 }}>
        <View style={{ flex: 1 }}>
          <Mybutton
            title="New Contact"
            customClick={() => navigation.navigate('NewContact')}
          />
          <Mybutton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontSize: 16, paddingTop: 60, textAlign: 'center', color: 'grey' }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
