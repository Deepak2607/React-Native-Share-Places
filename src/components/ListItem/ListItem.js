import React,{Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid ,Image} from 'react-native';


const ListItem=(props) =>{ 

        return(               
        <View style={styles.item}>
         <Image style={styles.image} resizeMode='cover' source={props.image}/>
         <Text style={styles.itemText}>{props.place}</Text>
         <Button onPress={props.selectPlace} title='select' />
        </View>
    );
}
 
 export default ListItem;

const styles = StyleSheet.create({
  itemText: {
      color:'#404040',
      fontSize:20,
      alignItems:'flex-start',
  },
  item: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#D3D3D3',
    width:'95%',
    marginTop:5,
    marginBottom:5,
    padding:8,
    flexWrap:'wrap',
  },
  image:{
      height:35,
      width:35
  }    
    
});
