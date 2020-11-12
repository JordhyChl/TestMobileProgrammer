import React, { Component, useState } from 'react';
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
import { ListItem, Input, Button, Overlay } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { fcmService } from './components/FCMService'

var db = openDatabase({ name: 'UserDatabase.db' });

class RegisterCatatan extends Component {
  state = {
    isDateTimePickerVisible: false,
    notificationTime: moment(),
    catatanJudul: '',
    catatanDeskripsi: '',
    singleFile: '',
    isVisibleOverlay: false,
    notifyData: {}
  };

  selectOneFile = async () => {
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

  register_catatan = () => {
    console.log(catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, singleFile.name);

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
        [catatanJudul, catatanDeskripsi, catatanWaktu, catatanInterval, singleFile.name],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  componentDidMount() {
    fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification)
  }

  onRegister = (token) => {
    console.log("[Notification fcm ] onRegister:", token)
  }

  onNotification = (notify) => {
    console.log("[Notification fcm ] : onNotification:", notify)
    const notification = fcmService.buildNotification(this.createNotification(notify))
    fcmService.displayNotification(notification)
  }

  onOpenNotification = (notify) => {
    console.log("[Notification fcm ] : onOpenNotification ", notify)
    this.setState({ notifyData: notify._data }, () => this.setState({ isVisibleOverlay: true }))
  }

  setReminder = () => {
    const { notificationTime } = this.state;
    const { catatanDeskripsi, catatanJudul } = this.state
    let body = {
      _title: catatanJudul,
      _body: catatanDeskripsi,
      _data: {
        title: catatanJudul,
        body: catatanDeskripsi,
      },
      _notificationId: Math.random().toString(),
      time: notificationTime
    }
    this.scheduleReminder(body)
  };

  scheduleReminder = (notifyDetails) => {
    const notification = fcmService.buildNotification(this.createNotification(notifyDetails))
    fcmService.scheduleNotification(notification, notifyDetails.time)
    this.resetState()
  }

  closeOverLay = () => {
    this.setState({ isVisibleOverlay: false })
  }

  createNotification = (notify) => {
    const channelObj = {
      channelId: "SmapleChannelID",
      channelName: "SmapleChannelName",
      channelDes: "SmapleChannelDes"
    }
    const channel = fcmService.buildChannel(channelObj)
    const buildNotify = {
      title: notify._title,
      content: notify._body,
      sound: 'default',
      channel: channel,
      data: notify._data,
      colorBgIcon: "#1A243B",
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      vibrate: true,
      dataId: notify._notificationId
    }
    return buildNotify
  }

  resetState = () => {
    this.setState({
      notificationTime: moment(),
      catatanJudul: '',
      catatanDeskripsi: ''
    })
  }

  displayDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  closeDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handlePicked = date => {
    this.closeDateTimePicker();
    this.setState({
      notificationTime: moment(date),
    });
  };

  handleValueChange = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const { isDateTimePickerVisible,
      notificationTime, catatanJudul,
      catatanDeskripsi, notifyData } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cardTitleView}>
          <Text style={styles.cardTitle}>Add Reminder</Text>
        </View>
        <ListItem
          title="Time"
          titleStyle={styles.titleStyle}
          onPress={this.displayDateTimePicker}
          rightElement={<Text style={{ opacity: 0.7 }}>{moment(notificationTime).format('LT')}</Text>}
        />
        <View style={styles.titleView}>
          <Input
            style={styles.titleinput}
            value={catatanJudul}
            onChangeText={(text) => this.handleValueChange(text, 'catatanJudul')}
            placeholder="Title"
          />
          <Input
            multiline={true}
            numberOfLines={3}
            style={styles.titleinput}
            value={catatanDeskripsi}
            onChangeText={(text) => this.handleValueChange(text, 'catatanDeskripsi')}
            placeholder="Description"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => this.selectOneFile()}>
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
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <Button
            title="Add reminder"
            buttonStyle={{ width: 200, height: 40 }}
            onPress={() => this.setReminder()}
          />
        </View>
        <Overlay
          style={{ flex: 1 }}
          isVisible={this.state.isVisibleOverlay}
          onBackdropPress={() => this.closeOverLay()}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ margin: 20, fontSize: 20, fontWeight: '600' }}>{notifyData && notifyData.title}</Text>
            <Text style={{ margin: 20, fontSize: 16 }}>{notifyData && notifyData.body}</Text>
          </View>
        </Overlay>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handlePicked}
          onCancel={this.closeDateTimePicker}
          mode="datetime"
          is24Hour={false}
          date={new Date(notificationTime)}
          titleIOS="Pick your Notification time"
        />
        {/* <Image
          source={{ uri: singleFile.uri }}
          style={{ width: 424, height: 278 }}
        /> */}
        <Mybutton title="Submit" customClick={() => this.register_catatan()} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEFF0',
  },
  cardTitleView: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    color: '#585858',
    fontWeight: '600',
  },
  titleStyle: {
    fontSize: 20,
    color: '#585858',
  },
  subtitleStyle: {
    fontSize: 16,
    color: '#585858',
  },
  titleView: {
    margin: 20,
    backgroundColor: '#EEEFF0',
  },
  titleinput: {
    fontSize: 20,
    fontWeight: '600',
    margin: 5,
    backgroundColor: "#fff"
  }
});
export default RegisterCatatan