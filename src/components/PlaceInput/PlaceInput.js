import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid, Image, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import { MapView, Marker, ImagePicker, Constants, Location, Permissions} from 'expo';
import pickedImage from '../../assets/place3.jpg'; 

class PlaceInput extends React.Component { 

       render(){
      
        return ( 
            <View style={styles.container}>
   
            <TextInput style={styles.input} onChangeText={this.props.inputHandler} value={this.props.value} placeholder='Add a Place' />
            <View style={styles.button}>
            <Button title='Share Place' onPress={this.props.addPlace} disabled={!this.props.value}/> 
            </View>
         
            </View>
        );
    }
}


const mapStateToProps= (state) =>{
    return {
      value:state.value,
      places:state.places,
      selectedPlace:state.selectedPlace,
    } 
}

const mapDispatchToProps= (dispatch) =>{
    return{
        inputHandler: (event) =>  dispatch({
               type:"VALUE",
               value:event,
          }),
        addPlace: () =>  dispatch({
               type:"ADD_PLACE",
          }),
     }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaceInput)

const styles = StyleSheet.create({
  input: {
      width:'100%', 
      fontSize:20,
      borderWidth:1,
      borderRadius:3,
      borderColor:'#DCDCDC',
      padding:3,
      paddingLeft:10,
      marginTop:10
  },
  container: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width:'100%',

  },
  imageHolder:{
    width:'100%',
    height:250,
    backgroundColor:'#eee',
      marginTop:10,
      borderWidth:1,
      borderColor:'gray'
  },
  mapHolder:{
    width:'100%',
    height:250,
    backgroundColor:'#eee',
      marginTop:10,
      borderWidth:1,
      borderColor:'gray'
  },
    button:{
        margin:5
    },
    heading:{
        fontSize:25,
        marginTop:8,
        color:'gray',
    }
  
});
