import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Unorderedlist from 'react-native-unordered-list';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default function App() {
  const [items, setItems] = useState(["Milk", "Coffee", "Oranges"])
  const [filteredItems, setFilteredItems] = useState(["Milk", "Coffee", "Oranges"]);
  const [addedItems, setAddedItems] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);
  const [text, setText] = useState('')
  const [searched, setSearched] = useState(false);

  const searchItemHandler = (textInput) => {
  if(!btnClicked) {
    if(textInput) {
      const data = items.filter(item => {
        return item.toLowerCase().includes(textInput.toLowerCase())
      })
      setFilteredItems(data);
      setText(textInput);
    }
    else {
      setFilteredItems(items);
      setText(textInput)
    }
  }
  else {
    if(textInput) {
      const data = addedItems.filter(item => {
        return item.toLowerCase().includes(textInput.toLowerCase())
      })
      const items1 = items.filter(item => {
        return item.toLowerCase().includes(textInput.toLowerCase())
      })
      setFilteredItems(data.concat(items1));
      setText(textInput);
    }
    else {
      setFilteredItems(addedItems.concat(items));
      setText(textInput);
    }
  }

  setSearched(true);
}

const addItemHandler = () => {
//  setAddedItems(addedItems.concat( Math.random().toString(36).substring(7)))
  setBtnClicked(true);
  setSearched(false)
  setAddedItems(addedItems.concat( Math.random().toString(36).substring(7)));
//  setAddedItems(addedItems.concat(filteredItems));
}

  return (
    <View style={styles.container}>
      <View style={styles.parentView}>
        <TextInput 
          placeholder = "Search"
          onChangeText = {(text) => searchItemHandler(text)}
          value = {text}
          style = {styles.search}
        />
        <View style={styles.buttonView}>
          <Button
            onPress = {() => addItemHandler()}
            title = "+"
          />
        </View>
        <Unorderedlist>
            {searched ? filteredItems.map(item => (
              <Text key={item}  style={styles.list}>{item}</Text>
            )) : addedItems.concat(items).map(item1 => (
              <Text style={styles.list}>{item1}</Text>
            ))}
          </Unorderedlist>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  parentView: {
    backgroundColor: 'lightpink',
    width: 400,
    height: 500,
    marginTop: 35,
    borderRadius: 4
  },
  search: {
   alignSelf: 'flex-start',
   backgroundColor: 'gray',
   width: 200,
   borderRadius: 2,
   marginLeft: 75,
   height: 35,
   marginTop: 20
   
  },
  buttonView: {
   width: 50,
   alignSelf: 'flex-end',
   marginRight: 70,
   marginTop: -35,

},
list: {
  marginLeft: 150,
  paddingTop: 20,
  width: 100
}
});
