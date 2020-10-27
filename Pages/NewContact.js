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
  StyleSheet,
  Image,
  Button
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import RNPickerSelect from 'react-native-picker-select';
import { openDatabase } from 'react-native-sqlite-storage';
import { color } from 'react-native-reanimated';

var db = openDatabase({ name: 'UserDatabase.db' });

const RegisterCatatan = ({ navigation }) => {
  const [showWaktu, setShowWaktu] = useState(false);
  const [showInterval, setShowInterval] = useState(false);
  let [catatanJudul, setCatatanJudul] = useState('');
  let [catatanDeskripsi, setCatatanDeskripsi] = useState('');
  let [catatanWaktu, setCatatanWaktu] = useState('');
  let [catatanInterval, setCatatanInterval] = useState('');
  let [catatanLampiran, setCatatanLampiran] = useState('');

  let register_catatan = () => {
    console.log(catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, catatanLampiran);

    if (!catatanJudul) {
      alert('Please fill Judul Catatan');
      return;
    }
    if (!catatanDeskripsi) {
      alert('Please fill Deskripsi Catatan');
      return;
    }
    // if (!catatanWaktu) {
    //   alert('Please fill Waktu Pengingat');
    //   return;
    // }
    // if (!catatanInterval) {
    //   alert('Please fill Interval Pengingat');
    //   return;
    // }
    if (!catatanLampiran) {
      alert('Please fill Lampiran');
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
      <View style={{ flex: 1, marginTop: 200 }}>
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
              {showWaktu ? (

                <RNPickerSelect
                  placeholder={{
                    label: 'Pilih Waktu Pegingat',
                    color: '#9EA0A4',
                  }}
                  onValueChange={(catatanWaktu) => setCatatanWaktu(catatanWaktu)}
                  items={[
                    { label: '1 Hari', value: '1 Hari' },
                    { label: '3 Jam', value: '3 Jam' },
                    { label: '1 Jam', value: '1 Jam' },
                  ]}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 10,
                      right: 12,
                    },
                  }}
                />
              ) : null}
              <Mybutton
                title="Isi Waktu Pengingat"
                customClick={() => setShowWaktu(!showWaktu)}
              />
              {showInterval ? (
                <RNPickerSelect
                  placeholder={{
                    label: 'Pilih Interval Waktu',
                    color: '#9EA0A4',
                  }}
                  onValueChange={(catatanInterval) => setCatatanInterval(catatanInterval)}
                  items={[
                    { label: '1 Hari', value: '1 Hari' },
                    { label: '3 Jam', value: '3 Jam' },
                    { label: '1 Jam', value: '1 Jam' },
                  ]}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 10,
                      right: 12,
                    },
                  }}
                />
              ) : null}
              <Mybutton
                title="Isi Interval Waktu"
                customClick={() => setShowInterval(!showInterval)}
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

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    marginLeft: 35,
    marginTop: 10,
    marginRight: 35,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  }
});
