//    blog.edafait.com
//    www.edafait.com
// Screen to register the user

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

const RegisterCatatan = ({ navigation }) => {
  let [catatanJudul, setCatatanJudul] = useState('');
  let [catatanDeskripsi, setCatatanDeskripsi] = useState('');
  let [catatanWaktu, setCatatanWaktu] = useState('');
  let [catatanInterval, setCatatanInterval] = useState('');
  let [catatanLampiran, setCatatanLampiran] = useState('');

  let register_catatan = () => {
    console.log(catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, catatanLampiran);

    if (!catatanJudul) {
      alert('Please fill name');
      return;
    }
    if (!catatanDeskripsi) {
      alert('Please fill Contact Number');
      return;
    }
    if (!catatanWaktu) {
      alert('Please fill Address');
      return;
    }
    if (!catatanInterval) {
      alert('Please fill Address');
      return;
    }
    if (!catatanLampiran) {
      alert('Please fill Address');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_catatan (catatan_judul, catatan_desc, catatan_waktu, catatan_interval, catatan_lampiran) VALUES (?,?,?,?,?)',
        [catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, catatanLampiran],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop:200 }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Judul"
                onChangeText={(catatanJudul) => setCatatanJudul(catatanJudul)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Deskripsi"
                onChangeText={(catatanDeskripsi) => setCatatanDeskripsi(catatanDeskripsi)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Waktu"
                onChangeText={(catatanWaktu) => setCatatanWaktu(catatanWaktu)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Interval"
                onChangeText={(catatanInterval) => setCatatanInterval(catatanInterval)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Lampiran"
                onChangeText={(catatanLampiran) => setCatatanLampiran(catatanLampiran)}
                style={{ padding: 10 }}
              />
              <Mybutton title="Submit" customClick={register_catatan} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterCatatan;
