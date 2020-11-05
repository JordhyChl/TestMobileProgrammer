//    blog.edafait.com
//    www.edafait.com
// Screen to view single user

import React, { useState } from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const ViewCatatan = () => {
  let [inputCatatanID, setInputCatatanID] = useState('');
  let [catatanData, setCatatanData] = useState({});

  let searchCatatan = () => {
    console.log(inputCatatanID);
    setCatatanData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_catatan where catatan_id = ?',
        [inputCatatanID],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setCatatanData(results.rows.item(0));
          } else {
            alert('No user found');
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
          <Mybutton title="Search Catatan" customClick={searchCatatan} />
          <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
            <Text>Id: {catatanData.catatan_id}</Text>
            <Text>Catatan: {catatanData.catatan_judul}</Text>
            <Text>Deskripsi: {catatanData.catatan_desc}</Text>
            <Text>Waktu: {catatanData.catatan_waktu}</Text>
            <Text>Interval: {catatanData.catatan_interval}</Text>
            <Text>Lampiran: {catatanData.catatan_lampiran}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewCatatan;
