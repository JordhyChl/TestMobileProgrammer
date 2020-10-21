import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

//Connction to access the pre-populated user_db.db
//var db = openDatabase({ name: "data", createFromLocation: "~data.db" });
var db = openDatabase({name : "AdminDB.db", createFromLocation : 1});

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_admin', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.username}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Username: {item.username}</Text>
        <Text>Password: {item.password}</Text>
        <Text>Nama Depan: {item.firstname}</Text>
        <Text>Nama Belakang: {item.lastname}</Text>
        <Text>Tanggal Lahir: {item.birthdate}</Text>
        <Text>Jenis Kelamin: {item.sex}</Text>
        <Text>Foto Profil: {item.profpict}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;