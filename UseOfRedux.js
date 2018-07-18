import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid, StatusBar } from 'react-native';

import DetailsScreen from './src/components/DetailsScreen/DetailsScreen';
import Overall from './Overall';
import { createBottomTabNavigator } from 'react-navigation';

import {createStore} from 'redux';
import {Provider} from 'react-redux';


const RootStack = createBottomTabNavigator(
  {
    Home: Overall,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);



const initialState={
      counter:1,
      value: '',
      places:[], 
      selectedPlace:null,
}
const reducer=(state =initialState, action)=>{
    switch(action.type){
        case 'INC':
            return{
                ...state,
            counter:state.counter+ 1,
            } 
            break; 
        case 'ADD_PLACE':
            const newPlace={
                place:state.value,
                id: Date.now(),
                image: {uri:"https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"}
            }
            return{
                ...state,
            places:state.places.concat(newPlace)
            } 
            break; 
         case 'DELETE_PLACE':
            return{
                ...state,
            places:state.places.filter(place =>
                       return place.id!==action.placeId )
            } 
            break;    
    }
    return state;
}
const store= createStore(reducer);



export default class App extends React.Component {
    
    constructor(){
        super();
        this.state={
            showAuth:true,
        }
        this.loginHandler = () => {
         this.setState({showAuth:false})
        } 
  }
  render(){
      
    let navigation= null;
    if(this.state.showAuth===false)
         navigation=<RootStack/>
    else{
       navigation= (
           <View>
           <Text>Auth Screen</Text>
           <Button title="Login" onPress={this.loginHandler}/>
           </View>
       )
    }
      
    return(
        <Provider store={store}>
        {navigation}
        </Provider>
    );
  }
}


