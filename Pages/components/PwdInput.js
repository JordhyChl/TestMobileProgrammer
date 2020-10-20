//    blog.edafait.com
//    www.edafait.com
// Custom TextInput

import React from 'react';
import { View, TextInput } from 'react-native';

const PwdInput = (props) => {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderRadius: 7,
        borderColor: '#007FFF',
        borderWidth: 1,
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#007FFF"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
        secureTextEntry={true}
      />
    </View>
  );
};

export default PwdInput;
