import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid, StatusBar } from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PickImage from './src/components/PickImage/PickImage';
import PickLocation from './src/components/PickLocation/PickLocation';

import { createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

class Overall extends React.Component { 
    
    static navigationOptions = {
    title: 'Share Places',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#0066ff',
    },
  };
    
  render() {     
    return (
        <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={true}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'>
        
        <View style={{padding:10}}>
        <PickImage />
        <PickLocation />
        <PlaceInput />
        </View>
        
        </ScrollView>
        </View>
    );
  }
}

 export default createStackNavigator(
  {
    Home: Overall, 
  },
);


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
  },  
});
