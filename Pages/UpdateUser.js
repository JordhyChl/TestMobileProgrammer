//    blog.edafait.com
//    www.edafait.com
// Screen to update the user

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import RNPickerSelect from 'react-native-picker-select';
import { openDatabase } from 'react-native-sqlite-storage';
import DocumentPicker from 'react-native-document-picker';


var db = openDatabase({ name: 'UserDatabase.db' });

const UpdateCatatan = ({ navigation }) => {
  const [showWaktu, setShowWaktu] = useState(false);
  const [showInterval, setShowInterval] = useState(false);
  let [inputCatatanID, setInputCatatanID] = useState('');
  let [catatanJudul, setCatatanJudul] = useState('');
  let [catatanDeskripsi, setCatatanDeskripsi] = useState('');
  let [catatanWaktu, setCatatanWaktu] = useState('');
  let [catatanInterval, setCatatanInterval] = useState('');
  const [singleFile, setSingleFile] = useState('');
  //let [catatanLampiran, setCatatanLampiran] = useState('');

  let updateAllStates = (judul, deskripsi, waktu, interval, lampiran) => {
    setCatatanJudul(judul);
    setCatatanDeskripsi(deskripsi);
    setCatatanWaktu(waktu);
    setCatatanInterval(interval);
    singleFile(lampiran);
  };
  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
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
    console.log(inputCatatanID, catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, singleFile.name);

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
    // if (!catatanWaktu) {
    //   alert('Please fill Waktu');
    //   return;
    // }
    // if (!catatanInterval) {
    //   alert('Please fill Interval');
    //   return;
    // }
    // if (!catatanLampiran) {
    //   alert('Please fill Lampiran');
    //   return;
    // }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_catatan set catatan_judul=?, catatan_desc=?, catatan_waktu=?, catatan_interval=?, catatan_lampiran=? where catatan_id=?',
        [catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, singleFile.name, inputCatatanID],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
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
      <View style={{ flex: 1, marginTop: 100 }}>
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
              {showWaktu ? (

                <RNPickerSelect
                  placeholder={{
                    label: 'Pilih Waktu Pegingat',
                    color: '#9EA0A4',
                  }}
                  value={catatanWaktu}
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
                  value={catatanInterval}
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
                value={singleFile.name}
                //onChangeText={(singleFile) => setSingleFile(singleFile)}
                style={{ padding: 10 }}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={selectOneFile}>
                {/*Single file selection button*/}
                <Text style={{ marginRight: 10, fontSize: 19, paddingTop: 10 }}>
                  Click here to pick file
              </Text>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/offices/40/000000/attach.png',
                  }}
                  style={styles.imageIconStyle}
                />
              </TouchableOpacity>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});
