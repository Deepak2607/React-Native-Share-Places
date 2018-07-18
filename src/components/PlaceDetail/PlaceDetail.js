import React,{Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import { MapView, Marker, Constants, Location, Permissions} from 'expo';

class PlaceDetail extends React.Component{
    
render(){
     
    let modalContent=null;
     if(this.props.selectedPlace!==null)
     {
         modalContent=(
             <View>
             {this.props.selectedPlace.map(selected =>  
                <View key={selected.id}>
                    <Image style={styles.placeImage} source={selected.image}/>
             
                    <View style={styles.mapHolder}>
                    <MapView style={{ flex: 1 }} initialRegion={this.props.location}>
                     <MapView.Marker coordinate={this.props.location} />
                     </MapView>
                    </View>
             
                    <Text style={styles.text}>{selected.place}</Text>
                 
                   <View style ={styles.container}>
                    <TouchableOpacity style={styles.button1} onPress= {() =>this.props.deletePlace(selected.id)}>
                    <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2}  onPress={this.props.closeModal}>
                    <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                   </View>
              
               </View>
              )}
             </View>
         )
     }
    
    return(
       
        <Modal visible={this.props.selectedPlace!==null} animationType='slide'
        onRequestClose= {this.props.closeModal} >
        
        {modalContent}
          
        </Modal> 
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
        deletePlace: (id) =>  dispatch({
               type:"DELETE_PLACE",
               placeId:id
          }),
        closeModal: () =>  dispatch({
               type:"CLOSE_MODAL",
          }),
     }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaceDetail)


const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start', 
    justifyContent:'space-around',
    marginTop:10,
  },
  text:{
    textAlign:'center',
    fontSize:20,
    padding:10,
    backgroundColor:'#E8E8E8',
      borderBottomWidth:1,
      borderBottomColor:'#C8C8C8',
    },
  placeImage: {
    width: "100%",
    height: 250
  }, 
    button1:{
        backgroundColor:'#ff3333',
        padding:8,
        width:70,
        borderWidth:1,
        borderRadius:2,
        borderColor:'#ff3333',
        marginLeft:70
    },
    button2:{
        backgroundColor:'#00b300',
        padding:8,
        width:60,
        borderWidth:1,
        borderRadius:3,
        borderColor:'#00b300',
        marginRight:70
    },
    buttonText:{
        fontSize:17,
        color:'white'
    },
    mapHolder:{
    width:'100%',
    height:250,
    backgroundColor:'#eee',
    borderWidth:1,
    borderColor:'#C8C8C8'
  },
  
});


//<TouchableOpacity  
//         onPress= {() =>this.props.deletePlace(this.props.selectedPlace.id)}>
//         <Ionicons style={{textAlign:'center'}} name="ios-trash" size={32} color="red" />
//         </TouchableOpacity>