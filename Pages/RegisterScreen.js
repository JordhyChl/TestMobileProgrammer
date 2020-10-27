// Example: Pre-Populated SQLite Database in React Native
// https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native
// Screen to register the user

import React, { useState } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Button,
    Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'AdminDB.db', createFromLocation: 1 });

const RegisterAdmin = ({ navigation }) => {
    //const [shouldShow, setShouldShow] = useState(true);
    let [adminUserName, setAdminUserName] = useState('');
    let [adminPassword, setAdminPassword] = useState('');
    let [adminFName, setAdminFName] = useState('');
    let [adminLName, setAdminLName] = useState('');
    let [adminBirthDate, setAdminBirthDate] = useState('');
    let [adminSex, setAdminSex] = useState('');
    let [adminProfPict, setAdminProfPict] = useState('');

    let register_admin = () => {
        console.log(adminUserName, adminPassword, adminFName, adminLName, adminBirthDate, adminSex, adminProfPict);

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
            alert('Please fill Profile Pict');
            return;
        }

        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO tbl_admin (username, password, firstname, lastname, birthdate, sex, profpict) VALUES (?,?,?,?,?,?,?)',
                [adminUserName, adminPassword, adminFName, adminLName, adminBirthDate, adminSex, adminProfPict],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'You are Registered Successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Login'),
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
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{ flex: 1, justifyContent: 'space-between' }}>
                            <Mytextinput
                                placeholder="Enter Username"
                                onChangeText={(adminUserName) => setAdminUserName(adminUserName)}
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter Password"
                                onChangeText={(adminPassword) => setAdminPassword(adminPassword)}
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter First Name"
                                onChangeText={(adminFName) => setAdminFName(adminFName)}
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter Last Name"
                                onChangeText={(adminLName) => setAdminLName(adminLName)}
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter Birth Date"
                                onChangeText={(adminBirthDate) => setAdminBirthDate(adminBirthDate)}
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter Sex"
                                onChangeText={(adminSex) => setAdminSex(adminSex)}
                                style={{ padding: 10 }}
                            />
                            <Mytextinput
                                placeholder="Enter Profile Picture"
                                onChangeText={(adminProfPict) => setAdminProfPict(adminProfPict)}
                                style={{ padding: 10 }}
                            />
                            <Mybutton title="Submit" customClick={register_admin} />
                        </KeyboardAvoidingView>
                        {/* {shouldShow ? (
                            <Mybutton title="Submit" customClick={register_admin} />
                        ) : null}
                        <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
                            <Text style={{ fontSize: 16, paddingTop: 20, textAlign: 'center', color: 'grey' }}>Register?</Text>
                        </TouchableOpacity> */}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

// const styles = StyleSheet.create({
//     container: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       flex: 3,
//     },
//   });

export default RegisterAdmin;