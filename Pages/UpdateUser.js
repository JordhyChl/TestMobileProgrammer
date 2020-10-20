//    blog.edafait.com
//    www.edafait.com
// Screen to update the user

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const UpdateCatatan = ({ navigation }) => {
  let [inputCatatanID, setInputCatatanID] = useState('');
  let [catatanJudul, setCatatanJudul] = useState('');
  let [catatanDeskripsi, setCatatanDeskripsi] = useState('');
  let [catatanWaktu, setCatatanWaktu] = useState('');
  let [catatanInterval, setCatatanInterval] = useState('');
  let [catatanLampiran, setCatatanLampiran] = useState('');

  let updateAllStates = (judul, deskripsi, waktu, interval, lampiran) => {
    setCatatanJudul(judul);
    setCatatanDeskripsi(deskripsi);
    setCatatanWaktu(waktu);
    setCatatanInterval(interval);
    setCatatanLampiran(lampiran);
  };

  let searchCatatan = () => {
    console.log(inputCatatanID);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_catatan where catatan_id = ?',
        [inputCatatanID],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.catatan_judul, res.catatan_desc, res.catatan_waktu, res.catatan_interval, res.catatan_lampiran);
          } else {
            alert('No user found');
            updateAllStates('', '', '', '', '');
          }
        }
      );
    });
  };
  let updateCatatan = () => {
    console.log(inputCatatanID, catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, catatanLampiran);

    if (!inputCatatanID) {
      alert('Please fill catatan id');
      return;
    }
    if (!catatanJudul) {
      alert('Please fill Judul');
      return;
    }
    if (!catatanDeskripsi) {
      alert('Please fill Deskripsi');
      return;
    }
    if (!catatanWaktu) {
      alert('Please fill Waktu');
      return;
    }
    if (!catatanInterval) {
      alert('Please fill Interval');
      return;
    }
    if (!catatanLampiran) {
      alert('Please fill Lampiran');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_catatan set catatan_judul=?, catatan_desc=?, catatan_waktu=?, catatan_interval=?, catatan_lampiran=? where catatan_id=?',
        [catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, catatanLampiran, inputCatatanID],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop:100 }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Catatan Id"
                style={{ padding: 10 }}
                onChangeText={(inputCatatanID) => setInputCatatanID(inputCatatanID)}
              />
              <Mybutton title="Search Catatan" customClick={searchCatatan} />
              <Mytextinput
                placeholder="Enter Judul"
                value={catatanJudul}
                style={{ padding: 10 }}
                onChangeText={(catatanJudul) => setCatatanJudul(catatanJudul)}
              />
              <Mytextinput
                placeholder="Enter Deskripsi"
                value={catatanDeskripsi}
                style={{ padding: 10 }}
                onChangeText={(catatanDeskripsi) => setCatatanDeskripsi(catatanDeskripsi)}
              />
              <Mytextinput
                placeholder="Enter Waktu"
                value={catatanWaktu}
                style={{ padding: 10 }}
                onChangeText={(catatanWaktu) => setCatatanWaktu(catatanWaktu)}
              />
              <Mytextinput
                placeholder="Enter Interval"
                value={catatanInterval}
                style={{ padding: 10 }}
                onChangeText={(catatanInterval) => setCatatanInterval(catatanInterval)}
              />
              <Mytextinput
                placeholder="Enter Lampiran"
                value={catatanLampiran}
                style={{ padding: 10 }}
                onChangeText={(catatanLampiran) => setCatatanLampiran(catatanLampiran)}
              />
              <Mybutton title="Update Catatan" customClick={updateCatatan} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.edafait.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default UpdateCatatan;
