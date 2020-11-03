import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import RNPickerSelect from 'react-native-picker-select';
import { openDatabase } from 'react-native-sqlite-storage';
import DocumentPicker from 'react-native-document-picker';

var db = openDatabase({ name: 'UserDatabase.db' });

const RegisterCatatan = ({ navigation }) => {
  const [showWaktu, setShowWaktu] = useState(false);
  const [showInterval, setShowInterval] = useState(false);
  let [catatanJudul, setCatatanJudul] = useState('');
  let [catatanDeskripsi, setCatatanDeskripsi] = useState('');
  let [catatanWaktu, setCatatanWaktu] = useState('');
  let [catatanInterval, setCatatanInterval] = useState('');
  let [catatanLampiran, setCatatanLampiran] = useState('');
  //let [catatanLampiran, setCatatanLampiran] = [JSON.stringify(catatanLampiran)];

  const [singleFile, setSingleFile] = useState('');
  //const [multipleFile, setMultipleFile] = useState([]);

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
    // if (!catatanLampiran) {
    //   alert('Please fill Lampiran');
    //   return;
    // }
    //JSON.stringify(catatanLampiran)

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
      <View style={{ flex: 1 }}>
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
                value={singleFile.name}
                onChangeText={(catatanLampiran) => console.log(catatanLampiran)}
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
              {/*Showing the data of selected Single file*/}
              {/* <Text style={styles.textStyle} >
                File Name: {singleFile.name ? singleFile.name : ''}
                {'\n'}
                Type: {singleFile.type ? singleFile.type : ''}
                {'\n'}
                File Size: {singleFile.size ? singleFile.size : ''}
                {'\n'}
                URI: {singleFile.uri ? singleFile.uri : ''}
                {'\n'}
              </Text> */}
              <Image
                source={{ uri: singleFile.uri }}
                style={{ width: 424, height: 278 }}
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
