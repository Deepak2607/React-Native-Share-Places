import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid, StatusBar, Image, ImageBackground, TouchableNativeFeedback, Dimensions , Alert} from 'react-native';

import DetailsScreen from './src/components/DetailsScreen/DetailsScreen';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import AuthScreen from './src/components/AuthScreen/AuthScreen';
import Overall from './Overall';
import { createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


const initialState={
      counter:1,
      value: '',
      places:[], 
      selectedPlace:null,
      pickedImage:null,
      location: {
          latitude: 26.248468,
          longitude: 78.174592,
          latitudeDelta: 0.0122,
          longitudeDelta:Dimensions.get('window').width / 
                         Dimensions.get('window').height* 0.0122,
             }, 
}
const reducer=(state =initialState, action)=>{
    switch(action.type){
        case 'INC':
            return{
                ...state,
            counter:state.counter+ 1,
            } 
            break;
        case 'VALUE':
            return{
                ...state,
            value:action.value,
            } 
            break;
        case 'ADD_IMAGE':
            return{
                ...state,
            pickedImage:action.image,
            } 
            break;
        case 'ADD_LOCATION':
            return{
                ...state,
                location: {
                  ...state.location,
                  latitude: action.location.latitude,
                  longitude: action.location.longitude,
                  },
            } 
            break;
        case 'ADD_PLACE':
            const newPlace={
                place:state.value,
                id: Date.now(),
                image: {uri:state.pickedImage},
            }
            return{
                ...state,
            places:state.places.concat(newPlace),
            value:''
            } 
            break;
        case 'SELECT_PLACE':
            return{
                ...state,
             selectedPlace:state.places.filter(place=>{
                   return place.id === action.placeId         
             })
            }
            break;
        case 'DELETE_PLACE':
              return {
                ...state,
                places:state.places.filter(place => {
                  return place.id !== action.placeId;
                }),
                selectedPlace:null
              };
        case 'CLOSE_MODAL':
            return{
                ...state,
                 selectedPlace:null          
            } 
            break;
    }
    return state;
}
const store= createStore(reducer);



const RootStack = createMaterialBottomTabNavigator(
{
  Home: { screen: Overall },
  Places: { screen: PlaceList }
},
{
  initialRouteName: 'Home',
  activeTintColor: '#f0edf6',
  inactiveTintColor: '#003d99',
  barStyle: { backgroundColor: '#1a75ff' },
},
);


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
               <View style={{flex:1}}>
               <AuthScreen loginHandler={this.loginHandler} />
               </View>
        )}
      
        return(
            <Provider store={store}>
            {navigation}
            </Provider>
        );
    }
}


const styles = StyleSheet.create({
  
})    