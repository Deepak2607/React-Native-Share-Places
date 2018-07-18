import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid, Image, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import { MapView, Marker, Constants, Location, Permissions} from 'expo';


class PickLocation extends React.Component { 
    
       constructor(){
         super();
         this.state={
                   
         }
           
         this.pickLocationHandler1 =(event)=> {
             const coords= event.nativeEvent.coordinate;
             this.map.animateToRegion({
                 ...this.state.location,
                 latitude:coords.latitude,
                 longitude:coords.longitude,      
             })
             
              this.setState( prevState => {
                 return{
                     location:{
                         ...prevState.location,
                         latitude:coords.latitude,
                         longitude:coords.longitude,
                     }         
             }});
         }
         
           
           this.getCurrentLocation1 = async () => {
         
            let myLocation = await Location.getCurrentPositionAsync({}); 
               
             this.map.animateToRegion({
                 ...this.state.location,
                 latitude:myLocation.coords.latitude,
                 longitude:myLocation.coords.longitude,     
             })
               
            this.setState( prevState => {
                 return{
                     location:{
                         ...prevState.location,
                         latitude:myLocation.coords.latitude,
                         longitude:myLocation.coords.longitude,
                     }         
             }});
              
          }; 
           
           
           
           this.pickLocationHandler =(event)=> {
             const coords= event.nativeEvent.coordinate;
               
             this.map.animateToRegion({
                 ...this.props.location,
                 latitude:coords.latitude,
                 longitude:coords.longitude,      
             })
             
             this.props.addLocation(coords);
           }
         
           
           this.getCurrentLocation = async () => {
            let myLocation = await Location.getCurrentPositionAsync({}); 
               
             this.map.animateToRegion({
                 ...this.props.location,
                 latitude:myLocation.coords.latitude,
                 longitude:myLocation.coords.longitude,     
             })
               
            this.props.addLocation(myLocation.coords);
              
          };
         
}

       render(){
      
        return ( 
            <View style={styles.container}>
            <View style={styles.mapHolder}>
            <MapView style={{ flex: 1 }}
             initialRegion={this.props.location}  
             onPress={this.pickLocationHandler}
             ref={ref => this.map = ref} >
             <MapView.Marker coordinate={this.props.location} />
             </MapView>
            </View>
            <View style={styles.button}>
            <Button title='Locate me' onPress={this.getCurrentLocation}></Button>
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
      location:state.location,
    } 
}

const mapDispatchToProps= (dispatch) =>{
    return{
        addLocation:(pickedLocation) =>dispatch({
               type:"ADD_LOCATION",
               location:pickedLocation
          }),
     }
}

export default connect(mapStateToProps,mapDispatchToProps)(PickLocation)

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
