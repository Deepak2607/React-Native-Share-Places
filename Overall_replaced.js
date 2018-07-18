import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid, StatusBar } from 'react-native';

import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import placeImage from './src/assets/place1.jpg';

export default class Overall extends React.Component { 
     constructor(){
         super();
         this.state={value: '',
                      places:[], 
                    selectedPlace:null, }
         
         this.inputHandler=(event) =>{   
           this.setState({value: event})  
         }
             
         this.addPlace=() =>{    
           const newPlace={
                place:this.state.value,
                id: Date.now(),
                image: placeImage
            }
           this.setState( (prevState)=>({
                places:prevState.places.concat(newPlace), 
                value: ''
            }))
         }
         
         this.selectPlace=(placeId)=>{ 
            this.state.places.map(place=>{
             if(place.id === placeId)
             {
                 this.setState({
                        selectedPlace:place
                    })       
             }})    
         }
         this.closeModal=()=>{
             this.setState({
                selectedPlace:null
             }) 
         }
         
         this.deletePlace=(placeId)=>{
             const updatedPlaces=this.state.places.filter(place =>{
                    return placeId !== place.id
                 })
             this.setState({
                 places:[].concat(updatedPlaces),
                 selectedPlace:null
             }) 
         }
         this.handleDeleteItem=(itemId)=>{
            
            const updatedItems=this.state.items.filter(item=>{
                return item.id!==itemId    
            })
            
            this.setState({
                items:[].concat(updatedItems)
            })
        }
               
}
    
  render() {     
    return (
        <View style={styles.container}>  
        <PlaceDetail selectedPlace={this.state.selectedPlace} closeModal={this.closeModal} deletePlace={this.deletePlace} />
        <PlaceInput inputHandler={this.inputHandler} value={this.state.value} addPlace={this.addPlace} />
        <PlaceList places={this.state.places} selectPlace={this.selectPlace} />
        <Button title="Go to Details" onPress={() => this.props.navigation.navigate('Details')} />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },     
});

