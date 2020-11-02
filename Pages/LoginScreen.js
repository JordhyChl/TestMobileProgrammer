import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Mytextinput from './components/Mytextinput';
import PwdInput from './components/PwdInput';
import Mybutton from './components/Mybutton';
import AsyncStorage from '@react-native-community/async-storage';
import MyView from './MyView';

let db;
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            getValue: '',
        };
    }

    componentDidMount() {
        db = SQLite.openDatabase({ name: "AdminDB.db", createFromLocation: 1 },
            this.openSuccess, this.openError);
    }

    componentWillUnmount() {
        this.closeDatabase();
    }

    openSuccess() {
        console.log("Database is opened");
    }

    openError(err) {
        console.log("error: ", err);
    }

    closeDatabase = () => {
        if (db) {
            console.log("Closing database ...");
            db.close();
        } else {
            console.log("Database was not OPENED");
        }
    }

    saveValueFunction = () => {
        if (this.state.username) {
            AsyncStorage.setItem('any_key_here', this.state.username);
            this.setState({ username: '' })
            alert('Data Saved');
        } else {
            alert('Please fill data');
        }
    };

    getValueFunction = () => {
        AsyncStorage.getItem('any_key_here').then(value =>
            this.setState({ getValue: value })
        );
    };

    removeItemValue() {
        try {
            AsyncStorage.removeItem('any_key_here');
            alert('Berhasil Menghapus Data')
        }
        catch (exception) {
            console.log(exception)
            alert('Gagal Menghapus Data')
        }
    };


    // removeValueFunction = () => {
    //     AsyncStorage.removeItem('any_key_here', this.state.username)
    // }

    onLoginPress() {
        const { username, password } = this.state;
        if (username === '' || password === '') {
            alert('Please enter your username and password!');
            return;
        }
        db.transaction((tx) => {
            const sql = `SELECT * FROM tbl_admin WHERE username='${username}'`;
            tx.executeSql(sql, [], (tx, results) => {
                const len = results.rows.length;
                if (!len) {
                    alert('This account does not exist!');
                } else {
                    const row = results.rows.item(0);
                    if (password === row.password) {
                        this.props.navigation.navigate('HomeScreen');
                        Alert.alert(
                            'Selamat Datang',
                            this.state.username
                        );
                        return;
                    }
                    alert('Authentication failed!');
                }
            });
        });
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={{ paddingTop: 200 }}>
                        <Mytextinput
                            placeholder="Username"
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.username}
                            style={{ padding: 10 }}
                        />
                        <PwdInput
                            placeholder="Password"
                            secureTextEntry="true"
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            style={{ padding: 10 }}
                        />
                        <Mybutton title="Login" customClick={() => this.onLoginPress()} />
                        <Mybutton title="Save Data AsyncStorage" customClick={() => this.saveValueFunction()} />
                        <Mybutton title="View Data AsyncStorage" customClick={() => this.getValueFunction()} />
                        <Mybutton title="Delete Data AsyncStorage" customClick={() => this.removeItemValue()} />
                        <Text style={styles.text}> {this.state.getValue} </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                            <Text style={{ fontSize: 16, paddingTop: 20, textAlign: 'center', color: 'grey' }}>Register?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminScreen')}>
                            <Text style={{ fontSize: 16, paddingTop: 20, textAlign: 'center', color: 'grey' }}>View All Admin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminUpdate')}>
                            <Text style={{ fontSize: 16, paddingTop: 20, textAlign: 'center', color: 'grey' }}>Admin Update</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 16,
        paddingTop: 32
    },
    textWho: {
        fontWeight: 'bold',
        fontSize: 16
    },
    viewResult: {
        flexDirection: 'row'
    },

    textInput: {
        height: 40,
        width: 300,
        backgroundColor: 'white',
        marginTop: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        borderRadius: 10
    },
    text: {
        paddingTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    viewRemove: {
        marginTop: 20
    }
});