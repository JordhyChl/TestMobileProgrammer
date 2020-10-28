import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, StyleSheet } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
// import Mybutton from './components/Mybutton';
//import Mytext from './components/Mytext';
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
            textUsername: '',
            textPassword: '',
        };
        AsyncStorage.getItem('DataLogin', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result)
                this.setState({
                    username: resultParsed.username,
                    password: resultParsed.password
                });
            }
        });
    }

    saveToLocal() {
        let username = this.state.textUsername;
        let password = this.state.textPassword;
        let data = {
            username: username,
            password: password
        }

        AsyncStorage.setItem('DataLogin', JSON.stringify(data));

        this.setState({
            username: username,
            password: password
        });

        alert('Data tersimpan');
    }

    async removeItemValue() {
        try {
            // Mengahpus data kdari local storage
            await AsyncStorage.removeItem('DataLogin');
            alert('Berhasil Menghapus Data')
        }
        catch (exception) {
            console.log(exception)
            alert('Gagal Menghapus Data')
        }
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
                            'Notifikasi',
                            'Tempat Notifikasi'
                        );
                        return;
                    }
                    alert('Authentication failed!');
                }
            });
        });
    }
    render() {
        //const { wrapper, header, labelInput, input, formInput, registerLabel } = styles;
        // const propsFloatingLabel = {
        //     labelStyle: labelInput,
        //     inputStyle: input,
        //     style: formInput
        // }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ paddingTop: 200 }}>
                    {/* <Text>Login Information</Text> */}
                    <Text style={styles.textWho}>
                        Siapa Saya ?
                </Text>
                    <Text style={styles.viewResult}>
                        Username: {this.state.username}{'\n'}
                        Password: {this.state.password}
                    </Text>
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
    viewRemove: {
        marginTop: 20
    }
});