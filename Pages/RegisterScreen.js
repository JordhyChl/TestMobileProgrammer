import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
//import FloatingLabel from 'react-native-floating-labels';
// import Mybutton from './components/Mybutton';
// import Mytext from './components/Mytext';
import SQLite from 'react-native-sqlite-storage';
import Mytextinput from './components/Mytextinput';
import PwdInput from './components/PwdInput';
import Mybutton from './components/Mybutton';

//import styles from './Login.component.style';
//import MyButton from '../MyButton/MyButton.component';

let db;
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            namadepan: '',
            namabelakang: '',
            tgllahir: '',
            jeniskelamin: '',
            fotoprofil: '',
        };
    }

    componentDidMount() {
        db = SQLite.openDatabase({ name: "data.db", createFromLocation: 1 },
            this.openSuccess, this.openError);
    }

    // componentWillUnmount() {
    //     this.closeDatabase();
    // }

    openSuccess() {
        console.log("Database is opened");
    }

    openError(err) {
        console.log("error: ", err);
    }

    // closeDatabase = () => {
    //     if (db) {
    //         console.log("Closing database ...");
    //         db.close();
    //     } else {
    //         console.log("Database was not OPENED");
    //     }
    // }

    onRegisterPress() {
        const { username, password, confirmPassword, namadepan, namabelakang, tgllahir, jeniskelamin, fotoprofil } = this.state;
        if (username === '' || password === '' || namadepan === '' || namabelakang === '' || tgllahir === '' || jeniskelamin === '' || fotoprofil === '') {
            alert('Please enter the Field!');
            return;
        }
        if (password !== confirmPassword) {
            alert('Password and Confirm Password does not match!');
            return;
        }
        db.transaction((tx) => {
            let sql = `SELECT * FROM users WHERE username='${username}'`;
            tx.executeSql(sql, [], (tx, results) => {
                const len = results.rows.length;
                if (len===0) {
                    let sql = `INSERT INTO users (username, password, namadepan, namabelakang, tgllahir, jeniskelamin, fotoprofil) VALUES (?,?,?,?,?,?,?)`;
                    tx.executeSql(sql, [], (tx, results) => {
                        alert('Register successfuly!');
                    });
                } else {
                    alert('This username is used! Please choose another username.');
                    return;
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
            
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{paddingTop:100}}>
                <Mytextinput
                    placeholder="Username"
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                    style={{ padding: 10 }}
                />
                <PwdInput
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    style={{ padding: 10 }}
                />
                <PwdInput
                    placeholder="Confirm Password"
                    secureTextEntry
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                    value={this.state.confirmPassword}
                    style={{ padding: 10 }}
                />
                <Mytextinput
                    placeholder="Nama Depan"
                    onChangeText={(text) => this.setState({ namadepan: text })}
                    value={this.state.namadepan}
                    style={{ padding: 10 }}
                />
                <Mytextinput
                    placeholder="Nama Belakang"
                    onChangeText={(text) => this.setState({ namabelakang: text })}
                    value={this.state.namabelakang}
                    style={{ padding: 10 }}
                />
                <Mytextinput
                    placeholder="Tanggal Lahir"
                    onChangeText={(text) => this.setState({ tgllahir: text })}
                    value={this.state.tgllahir}
                    style={{ padding: 10 }}
                />
                <Mytextinput
                    placeholder="Jenis Kelamin"
                    onChangeText={(text) => this.setState({ jeniskelamin: text })}
                    value={this.state.jeniskelamin}
                    style={{ padding: 10 }}
                />
                <Mytextinput
                    placeholder="Foto Profil"
                    onChangeText={(text) => this.setState({ fotoprofil: text })}
                    value={this.state.fotoprofil}
                    style={{ padding: 10 }}
                />
                {/* <FloatingLabel
                    {...propsFloatingLabel}
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                >Username</FloatingLabel>
                <FloatingLabel
                    {...propsFloatingLabel}
                    secureTextEntry
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                >Password</FloatingLabel>
                <FloatingLabel
                    {...propsFloatingLabel}
                    secureTextEntry
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                    value={this.state.confirmPassword}
                >Confirm Password</FloatingLabel> */}
                <Mybutton title="Register" customClick={() => this.onRegisterPress()} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{ fontSize: 16, paddingTop:20, textAlign: 'center', color: 'grey' }}>Login</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            

            // <View>
            //     {/* <Text>Login Information</Text> */}
            //     <Mytextinput
            //         placeholder="Username"
            //         onChangeText={(text) => this.setState({ username: text })}
            //         value={this.state.username}
            //         style={{ padding: 10 }}
            //     />
            //     <Mytextinput
            //         placeholder="Password"
            //         secureTextEntry= "true"
            //         onChangeText={(text) => this.setState({ password: text })}
            //         value={this.state.password}
            //         style={{ padding: 10 }}
            //     />
            //     {/* <FloatingLabel
            //         {...propsFloatingLabel}
            //         onChangeText={(text) => this.setState({ username: text })}
            //         value={this.state.username}
            //     >Username</FloatingLabel>
            //     <FloatingLabel
            //         {...propsFloatingLabel}
            //         secureTextEntry
            //         onChangeText={(text) => this.setState({ password: text })}
            //         value={this.state.password}
            //     >Password</FloatingLabel> */}
            //     <Mybutton title="Login" onPress={() => this.onLoginPress()} />
            //     {/* <MyButton
            //         label='Login'
            //         onPress={() => this.onLoginPress()}
            //     /> */}
            //     <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')}>
            //         <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>Register?</Text>
            //     </TouchableOpacity>
            //     {/* <Text style={{alignSelf:'center'}}>Đăng nhập: username: demo, password: 123456</Text> */}
            // </View>
        );
    }
}