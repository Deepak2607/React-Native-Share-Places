import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid ,Image} from 'react-native';
import { MapView, Marker } from 'expo';
import { Ionicons } from '@expo/vector-icons';

 class DetailsScreen2 extends React.Component {
     
     constructor(){
         super();
         this.state={
             region: {
              latitude: 26.248468,
              longitude: 78.174592,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
             },
              }
         this.onRegionChange =()=> {
              this.setState({ region });
            }
    }
     
    static navigationOptions = {
    title: 'Map',
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
      <MapView style={{ flex: 1 }} region={this.state.region} />
        
    );
  }
}

export default DetailsScreen2
