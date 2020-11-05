//    blog.edafait.com
//    www.edafait.com
// Custom Button

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Mybutton = (props) => {
  return (
    <TouchableOpacity onPress={props.customClick}>
      <LinearGradient colors={['#e87e43', '#c24908']} style={styles.button}>
      <Text style={styles.text}>{props.title}</Text>
      </LinearGradient>
      
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#c24908',
    color: '#ffffff',
    padding: 10,
    borderRadius: 7,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#ffffff',
  },
});

export default Mybutton;
