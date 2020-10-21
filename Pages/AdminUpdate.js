// Example: Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
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

//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'AdminDB.db', createFromLocation : 1});

const UpdateAdmin = ({ navigation }) => {
  let [inputAdminID, setInputAdminID] = useState('');
  let [adminUserName, setAdminUserName] = useState('');
  let [adminPassword, setAdminPassword] = useState('');
  let [adminFName, setAdminFName] = useState('');
  let [adminLName, setAdminLName] = useState('');
  let [adminBirthDate, setAdminBirthDate] = useState('');
  let [adminSex, setAdminSex] = useState('');
  let [adminProfPict, setAdminProfPict] = useState('');

  let updateAllStates = (userName, Password, Fname, Lname, Birth, Sex, Profpict) => {
    setAdminUserName(userName);
    setAdminPassword(Password);
    setAdminFName(Fname);
    setAdminLName(Lname);
    setAdminBirthDate(Birth);
    setAdminSex(Sex);
    setAdminProfPict(Profpict);
  };

  let searchAdmin = () => {
    console.log(inputAdminID);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tbl_admin where admin_id = ?',
        [inputAdminID],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.username, res.password, res.firstname, res.lastname, res.birthdate, res.sex, res.profpict);
          } else {
            alert('No user found');
            updateAllStates('', '', '', '', '', '', '');
          }
        }
      );
    });
  };
  let updateAdmin = () => {
    console.log(inputAdminID, adminUserName, adminPassword, adminFName, adminLName, adminBirthDate, adminSex, adminProfPict);

    if (!inputAdminID) {
      alert('Please fill Admin id');
      return;
    }
    if (!adminUserName) {
      alert('Please fill Username');
      return;
    }
    if (!adminPassword) {
      alert('Please fill Password');
      return;
    }
    if (!adminFName) {
      alert('Please fill First Name');
      return;
    }
    if (!adminLName) {
      alert('Please fill Last Name');
      return;
    }
    if (!adminBirthDate) {
      alert('Please fill Birth Date');
      return;
    }
    if (!adminSex) {
      alert('Please fill Sex');
      return;
    }
    if (!adminProfPict) {
      alert('Please fill Profile Picture');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE tbl_admin set username=?, password=?, firstname=?, lastname=?, birthdate=?, sex=?, profpict=? where admin_id=?',
        [adminUserName, adminPassword, adminFName, adminLName, adminBirthDate, adminSex, adminProfPict, inputAdminID],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Login'),
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Admin Id"
                style={{ padding: 10 }}
                onChangeText={(inputAdminID) => setInputAdminID(inputAdminID)}
              />
              <Mybutton title="Search Admin" customClick={searchAdmin} />
              <Mytextinput
                placeholder="Enter Username"
                value={adminUserName}
                style={{ padding: 10 }}
                onChangeText={(adminUserName) => setAdminUserName(adminUserName)}
              />
              <Mytextinput
                placeholder="Enter Password"
                value={adminPassword}
                style={{ padding: 10 }}
                onChangeText={(adminPassword) => setAdminPassword(adminPassword)}
              />
              <Mytextinput
                placeholder="Enter First Name"
                value={adminFName}
                style={{ padding: 10 }}
                onChangeText={(adminFName) => setAdminFName(adminFName)}
              />
              <Mytextinput
                placeholder="Enter Last Name"
                value={adminLName}
                style={{ padding: 10 }}
                onChangeText={(adminLName) => setAdminLName(adminLName)}
              />
              <Mytextinput
                placeholder="Enter Birthdate"
                value={adminBirthDate}
                style={{ padding: 10 }}
                onChangeText={(adminBirthDate) => setAdminBirthDate(adminBirthDate)}
              />
              <Mytextinput
                placeholder="Enter Sex"
                value={adminSex}
                style={{ padding: 10 }}
                onChangeText={(adminSex) => setAdminSex(adminSex)}
              />
              <Mytextinput
                placeholder="Enter Profile Pict"
                value={adminProfPict}
                style={{ padding: 10 }}
                onChangeText={(adminProfPict) => setAdminProfPict(adminProfPict)}
              />
              <Mybutton title="Update Admin" customClick={updateAdmin} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          Example of SQLite Database in React Native
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default UpdateAdmin;