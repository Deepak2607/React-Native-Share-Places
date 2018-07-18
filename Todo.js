import React, {Component} from 'react';
import { StyleSheet, View, Text, Button,  TextInput, TouchableOpacity, CheckBox, ScrollView, ToolbarAndroid } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Left, Right, Body, Icon, StyleProvider } from 'native-base';


 export default class App extends React.Component { 
     constructor(){
         super();
         this.state={value: '',
                      items:[],}
         
         this.inputHandler=(event) =>{   
           this.setState({value: event})  
         }
             
         this.addItem=() =>{    
           const newItem={
                task:this.state.value,
                id: Date.now(),
                status:false,
                checked:false
            }
           this.setState( (prevState)=>({
                items:prevState.items.concat(newItem), 
                value: ''
            }))
         }
         
         this.deleteItem=(itemId)=>{
            
            const updatedItems=this.state.items.filter(item=>{
                return item.id!==itemId    
            })
            
            this.setState({
                items:[].concat(updatedItems)
            })
         }
         
         this.checkItem=(itemId)=>{    
             const updatedItems= this.state.items.map(item =>{
                if(itemId === item.id)
                 { 
                     item.status = !item.status;
                     item.checked = !item.checked;
                 }      
                return item; })
            
            this.setState({
                items:[].concat(updatedItems)
            })        
         }
}
     
  render() {   
   
    return (
              
      <Container>
        <Header style={{height:70}}>
          <Body>
            <Title style={{marginLeft:125,marginTop:30,paddingBottom:10}}>Todo App</Title>
          </Body>  
        </Header>
        <Content>
           
        <View style={styles.container}>
          
        <View style={styles.container1}>
        <TextInput style={styles.input} onChangeText={this.inputHandler} value={this.state.value} placeholder='Type Your Text Here' />
        <Button title='Add' onPress={this.addItem} disabled={!this.state.value} />
        
        </View>
        
        <View style={styles.items}>
        <ScrollView>
        {this.state.items.map(item =>
            <View style={styles.item} key={item.id}>
             <CheckBox title='Click Here' value={item.checked} onValueChange={()=>this.checkItem(item.id)} />
             <Text key={item.id} style={styles.itemText}>{item.task}</Text>   
             <Button title='❌' color='#fff' onPress={() =>this.deleteItem(item.id)} />
            </View>
         )}
         </ScrollView>
         </View>
             
      </View>      
                  
        </Content>

        <Footer>
          <FooterTab> 
          <Title style={{marginLeft:115,paddingTop:15,color:'#fff',opacity:.8}}>Copyright@deepu</Title>   
          </FooterTab>
        </Footer>
      </Container>



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
  input: {
    width:250,
    marginTop: 18,
    fontSize:20,
    paddingBottom: 7,
    paddingLeft: 5,
  },
  container1: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 25,
  },
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
    backgroundColor: '#E8E8E8',
    width:'85%',
    marginTop:5,
    marginBottom:5,
    padding:8,
      
  },
  items: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row', 
  },  
     
});

