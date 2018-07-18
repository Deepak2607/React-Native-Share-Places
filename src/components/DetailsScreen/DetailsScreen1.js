import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid ,Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

 class DetailsScreen1 extends React.Component  {
     
    static navigationOptions = {
    title: 'Details 1',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#0066ff',
    },
       headerRight: (
            <TouchableOpacity onPress={() => alert('This is a button!')}>
             <Ionicons style={{textAlign:'center',marginRight:15}} name="ios-paper-plane" size={32} color="white" />
            </TouchableOpacity>
    ), 
  };
     
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen 1</Text>
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
        <Button title="Go to Map" onPress={() => this.props.navigation.navigate('Details2')} />
      </View>
    );
  }
}

 export default DetailsScreen1