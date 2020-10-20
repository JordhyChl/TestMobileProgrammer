import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
// import Mybutton from './components/Mybutton';
// import Mytext from './components/Mytext';
import SQLite from 'react-native-sqlite-storage';
import Mytextinput from './components/Mytextinput';
import PwdInput from './components/PwdInput';
import Mybutton from './components/Mybutton';

//import styles from './Login.component.style';
//import MyButton from '../MyButton/MyButton.component';

let db;
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    componentDidMount() {
        db = SQLite.openDatabase({ name: "data.db", createFromLocation: 1 },
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
            const sql = `SELECT * FROM users WHERE username='${username}'`;
            tx.executeSql(sql, [], (tx, results) => {
                const len = results.rows.length;
                if (!len) {
                    alert('This account does not exist!');
                } else {
                    const row = results.rows.item(0);
                    if (password === row.password) {
                        this.props.navigation.navigate('HomeScreen');
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
                <View style={{paddingTop:200}}>
                {/* <Text>Login Information</Text> */}
                <Mytextinput
                    placeholder="Username"
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                    style={{ padding: 10 }}
                />
                <PwdInput
                    placeholder="Password"
                    secureTextEntry= "true"
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
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
                >Password</FloatingLabel> */}
                <Mybutton title="Login" customClick={() => this.onLoginPress()} />
                {/* <MyButton
                    label='Login'
                    onPress={() => this.onLoginPress()}
                /> */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                    <Text style={{ fontSize: 16, paddingTop:20, textAlign: 'center', color: 'grey' }}>Register?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminScreen')}>
                    <Text style={{ fontSize: 16, paddingTop:20, textAlign: 'center', color: 'grey' }}>View All Admin</Text>
                </TouchableOpacity>
                {/* <Text style={{alignSelf:'center'}}>Đăng nhập: username: demo, password: 123456</Text> */}
            </View>
            </SafeAreaView>
        );
    }
}