import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid ,Image} from 'react-native';
import {connect} from 'react-redux';
import DetailsScreen1 from './DetailsScreen1';
import DetailsScreen2 from './DetailsScreen2';
import { createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

 class DetailsScreen extends React.Component  {
     
    static navigationOptions = {
    title: 'Details',
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
        <Text>Details Screen</Text>
        <Button title="Go to Details 1" onPress={() => this.props.navigation.navigate('Details1')} />
        <Button title="Add 1" onPress={this.props.plus1} />
        <Text>{this.props.counter}</Text>
      </View>
    );
  }
}


const mapStateToProps= (state) =>{
    return {
        counter:state.counter
    } 
}

const mapDispatchToProps= (dispatch) =>{
    return{
        plus1: () =>  dispatch({
               type:"INC",
          }),
     }
}

 export default createStackNavigator(
  {
      Details: connect(mapStateToProps,mapDispatchToProps)(DetailsScreen),
      Details1: connect(mapStateToProps,mapDispatchToProps)(DetailsScreen1),
      Details2: connect(mapStateToProps,mapDispatchToProps)(DetailsScreen2),
  },
  {
    initialRouteName: 'Details',
  }
);
