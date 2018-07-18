import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid } from 'react-native';
import ListItem from '../ListItem/ListItem';
import PlaceDetail from '../PlaceDetail/PlaceDetail'; 
import { createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';

class PlaceList extends React.Component{ 

    static navigationOptions = {
    title: 'Places',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#0066ff',
    },
  };
    
    render() {
        
        let content= null;
        if(this.props.places.length>0){
            content= (
                <ScrollView showsVerticalScrollIndicator={true}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='handled'>
                <View style={styles.container}>
                {this.props.places.map(info =>
                    <ListItem key= {info.id} id= {info.id} place= {info.place} image={info.image}  
                     selectPlace= {()=>this.props.selectPlace(info.id)}/> 
                 )}
                </View>
                </ScrollView>
            )
        }
        else{
            content=( 
               <View style={styles.alignButton}>
               <Text style={styles.buttonText}>No places to show..</Text>
               </View>
            )
        }
        
       return (
    
        <View style={styles.items}>
        <PlaceDetail/>
               
        {content}
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
        selectPlace: (id) =>  dispatch({
               type:"SELECT_PLACE",
               placeId:id
          })
     }
}


export default createStackNavigator(
  {
    Places: connect(mapStateToProps,mapDispatchToProps)(PlaceList),
  }
);
 

const styles = StyleSheet.create({
  items: {
    flex:1,
    justifyContent: 'center',
    flexDirection: 'column', 
    width:'100%',
  }, 
  container: {  
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
     width:'100%', 
  }, 
  buttonText:{
      fontSize:25,
      color:'#3385ff',
  },
  button:{
      borderWidth:2,
      borderColor:'#3385ff',
      borderRadius:25,
      backgroundColor:'#eee',
      padding:12,
      width:'28%'
  },
  alignButton:{
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'column', 
    width:'100%',
  }
     
});
