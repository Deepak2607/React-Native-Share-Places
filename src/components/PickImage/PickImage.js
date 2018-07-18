import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid, Image, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import {ImagePicker, Permissions} from 'expo';
import pickedImage from '../../assets/place3.jpg'; 

class PickImage extends React.Component { 
    
       constructor(){
         super();
         this.state={
                hasCameraPermission: null,  
         }
         
        this.takePhoto = async () => {
            const { status1 } = await Permissions.askAsync(Permissions.CAMERA);
            const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            
            if(status1 === 'granted' && status2 === 'granted'){
                
                let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3]
                });
            
                if (!result.cancelled){
                  this.setState({ pickedImage: result.uri });
                }
            }
        }
        
        
        this.pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
 
            if (!result.cancelled) {
              this.props.addImage(result.uri);
            }
        };
               
}

 
    
       render(){
      
        return ( 
            <View style={styles.container}>
            <Text style={styles.heading}>Share a place with us</Text>
            
            <View style={styles.imageHolder}>
            <Image source={{ uri: this.props.pickedImage }} style={{width:'100%',height:'100%'}} />
            </View>
            <View style={styles.button}>
            <Button title='Pick image' onPress={this.pickImage}></Button>
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
      pickedImage:state.pickedImage
    } 
}

const mapDispatchToProps= (dispatch) =>{
    return{
        
        addImage: (pickedImage) =>  dispatch({
               type:"ADD_IMAGE",
               image:pickedImage
          }),
     }
}

export default connect(mapStateToProps,mapDispatchToProps)(PickImage)

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
        margin:5,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
    },
    heading:{
        fontSize:25,
        marginTop:8,
        color:'gray',
    }
  
});
