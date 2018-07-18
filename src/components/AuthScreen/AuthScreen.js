import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid, StatusBar, Image, ImageBackground, TouchableNativeFeedback, Dimensions , Alert} from 'react-native';

import backgroundImage from '../../assets/backgroundImage10.jpg'

export default class App extends React.Component {
    
    constructor(){
        super();
        this.state={
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
                this.props.loginHandler();
            }
            
        }
  }
 
  render(){
      
    return(
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