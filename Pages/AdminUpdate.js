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
var db = openDatabase({ name: "data", createFromLocation: "~data.db" });

const UpdateAdmin = ({ navigation }) => {
    let [inputUsername, setInputUsername] = useState('');
    let [userPassword, setUserPassword] = useState('');
    let [userNamaDepan, setUserNamaDepan] = useState('');
    let [userNamaBelakang, setUserNamaBelakang] = useState('');
    let [userTglLahir, setUserTglLahir] = useState('');
    let [userJenisKelamin, setUserJenisKelamin] = useState('');
    let [userFotoProfil, setUserFotoProfil] = useState('');

    let updateAllStates = (uname, pwd, fname, lname, birth, sex, profilepict) => {
        setInputUsername(uname);
        setUserPassword(pwd);
        setUserNamaDepan(fname);
        setUserNamaBelakang(lname);
        setUserTglLahir(birth);
        setUserJenisKelamin(sex);
        setUserFotoProfil(profilepict);
    };

    let searchUser = () => {
        console.log(inputUsername);
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM users where username = ?',
                [inputUsername],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        let res = results.rows.item(0);
                        updateAllStates(res.username, res.password, res.namadepan, res.namabelakang, res.tgllahir, res.jeniskelamin, res.fotoprofil);
                    } else {
                        alert('No user found');
                        updateAllStates('', '', '', '', '', '', '');
                    }
                }
            );
        });
    };
    let updateUser = () => {
        console.log(inputUsername, userPassword, userNamaDepan, userNamaBelakang, userTglLahir, userJenisKelamin, userFotoProfil);

        if (!inputUsername) {
            alert('Please fill Username');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        if (!userNamaDepan) {
            alert('Please fill First Name');
            return;
        }
        if (!userNamaBelakang) {
            alert('Please fill Last Name');
            return;
        }
        if (!userTglLahir) {
            alert('Please fill Birth Date');
            return;
        }
        if (!userJenisKelamin) {
            alert('Please fill Sex');
            return;
        }
        if (!userFotoProfil) {
            alert('Please fill Profile Pict');
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE users set username=?, password=?, namadepan=? , namabelakang=? , tgllahir=? , jeniskelamin=? , fotoprofil=? where username=?',
                [inputUsername, userPassword, userNamaDepan, userNamaBelakang, userTglLahir, userJenisKelamin, userFotoProfil],
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
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Mytextinput
                                placeholder="Enter Username"
                                style={{ padding: 10 }}
                                onChangeText={(inputUsername) => setInputUsername(inputUsername)}
                            />
                            <Mybutton title="Search User" customClick={searchUser} />
                            <Mytextinput
                                placeholder="Enter Username"
                                value={inputUsername}
                                style={{ padding: 10 }}
                                onChangeText={(inputUsername) => setInputUsername(inputUsername)}
                            />
                            <Mytextinput
                                placeholder="Enter Password"
                                value={userPassword}
                                style={{ padding: 10 }}
                                onChangeText={(userPassword) => setUserPassword(userPassword)}
                            />
                            <Mytextinput
                                placeholder="Enter First Name"
                                value={userNamaDepan}
                                style={{ padding: 10 }}
                                onChangeText={(userNamaDepan) => setUserNamaDepan(userNamaDepan)}
                            />
                            <Mytextinput
                                placeholder="Enter Las Name"
                                value={userNamaBelakang}
                                style={{ padding: 10 }}
                                onChangeText={(userNamaBelakang) => setUserNamaBelakang(userNamaBelakang)}
                            />
                            <Mytextinput
                                placeholder="Enter Birth Date"
                                value={userTglLahir}
                                style={{ padding: 10 }}
                                onChangeText={(userTglLahir) => setUserTglLahir(userTglLahir)}
                            />
                            <Mytextinput
                                placeholder="Enter Sex"
                                value={userJenisKelamin}
                                style={{ padding: 10 }}
                                onChangeText={(userJenisKelamin) => setUserJenisKelamin(userJenisKelamin)}
                            />
                            <Mytextinput
                                placeholder="Enter Profile Picture"
                                value={userFotoProfil}
                                style={{ padding: 10 }}
                                onChangeText={(userFotoProfil) => setUserFotoProfil(userFotoProfil)}
                            />
                            <Mybutton title="Update Admin" customClick={updateUser} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UpdateAdmin;