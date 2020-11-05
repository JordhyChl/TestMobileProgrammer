//    blog.edafait.com
//    www.edafait.com
// Screen to delete the user

import React, { useState } from 'react';
import { Button, Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const DeleteCatatan = ({ navigation }) => {
  let [inputCatatanID, setInputCatatanID] = useState('');

  let deleteCatatan = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_catatan where catatan_id=?',
        [inputCatatanID],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid User Id');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop:200 }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter User Id"
            onChangeText={(inputCatatanID) => setInputCatatanID(inputCatatanID)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete Catatan" customClick={deleteCatatan} />
        </View>
       <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.edafait.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DeleteCatatan;
