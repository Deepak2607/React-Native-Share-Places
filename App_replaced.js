import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid, StatusBar, Image, ImageBackground, TouchableNativeFeedback, Dimensions , Alert} from 'react-native';

import backgroundImage from './src/assets/backgroundImage10.jpg'
import DetailsScreen from './src/components/DetailsScreen/DetailsScreen';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
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
            styles:{
                  viewMode:Dimensions.get("window").height > 500 ? 'portrait': 'landscape',
            },
          
            username:'',
            password:'',
            confirmPassword:'',
      
            
        }
        
        Dimensions.addEventListener('change', dims =>{
        this.setState({
            styles:{
              viewMode:Dimensions.get("window").height > 500 ? 'portrait': 'landscape',
        }
        })})
        
        this.loginHandler = () => {
         this.setState({showAuth:false})
        } 
        
        this.usernameHandler=(event)=>{
            
            this.setState({username:event});    
        }
        
        this.passwordHandler=(event)=>{
        
            this.setState({password:event}); 
        }
        
        this.confirmPasswordHandler=(event)=>{
            
            this.setState({confirmPassword:event}); 
        }
        
        this.submitHandler=()=>{
            let alerts=[];
            const text1= 'password must have 6 or more characters';
            const text2= '\n'+'passwords not match';
            const text3= '\n'+ 'username is empty';
     
            if(this.state.password.length< 6){
                 alerts.push(text1);
            }
            if(this.state.password!==this.state.confirmPassword && this.state.password!==''){
                 alerts.push(text2);
            }
            if (this.state.username===''){
                 alerts.push(text3);
            }  
           
            if(alerts.length >0){
                alert(alerts);
            }
            else{
                this.loginHandler();
            }
            
        }
  }
 
  render(){
      
    let navigation= null;
    if(this.state.showAuth===false)
         navigation=<RootStack/>
    else{
       navigation= (
           <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
           <View style={styles.container}>
           <Text style={{textAlign:'center', fontSize:25, color:'#585858'}} >Sign Up</Text>
           
           <View style={this.state.styles.viewMode =='portrait' ? styles.portraitOverallContainer : styles.landscapeOverallContainer }>
           <TextInput style={styles.input} placeholder='Username' underlineColorAndroid='transparent' value={this.state.username}
           onChangeText={this.usernameHandler} />
           
           <View style={this.state.styles.viewMode =='portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer }>
           
           <View style={this.state.styles.viewMode =='portrait' ? styles.portraitWrapperContainer : styles.landscapeWrapperContainer }>
           <TextInput secureTextEntry={true} style={styles.input} placeholder='Password' underlineColorAndroid='transparent' value={this.state.password} onChangeText={this.passwordHandler} />
           </View>
           
           <View style={this.state.styles.viewMode =='portrait' ? styles.portraitWrapperContainer : styles.landscapeWrapperContainer }>
           <TextInput secureTextEntry={true} style={styles.input} placeholder='Confirm Password' underlineColorAndroid='transparent' value={this.state.confirmPassword}
           onChangeText={this.confirmPasswordHandler} /> 
           </View>
           
           </View>
           
           </View>
           
           <Button title='Submit' onPress={this.submitHandler}/>
    
           </View>      
           </ImageBackground>
       )
    }
      
    return(
        <Provider store={store}>
        {navigation}
        </Provider>
    );
  }
}


const styles = StyleSheet.create({
  
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop:10,
    width:150,
  },
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    marginTop:30,
  },
  input:{
      margin:10,
      fontSize:18,
      borderWidth:1,
      borderColor:'#D8D8D8',
      borderRadius:20,
      padding:8,
      paddingLeft:15,
      backgroundColor:'#fff',
  },
  backgroundImage:{
      flex:1,
      width:'100%',
  },
    
  landscapePasswordContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
  },
  portraitPasswordContainer:{
      flexDirection:'column',
      justifyContent:'flex-start',
  },
  landscapeWrapperContainer:{
      width:'50%',
  },
  portraitWrapperContainer:{
      width: '100%',
  },
  landscapeOverallContainer:{
      width:'90%',
      padding:10,
  },
  portraitOverallContainer:{
      width:'100%',
      padding:10,
  }
  
  
})    

