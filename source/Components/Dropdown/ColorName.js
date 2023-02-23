import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  { label: 'BIEGE', value: '1', },
  { label: 'BLACK', value: '2' },
  { label: 'BLUE', value: '3' },
  { label: 'BRONZE', value: '4' },
  { label: 'BROWN', value: '5' },
];

const ColorName = ({colorId,colorName,colorsId}) => {
  const [value, setValue] = useState(colorsId);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(()=>{
    setValue(colorsId)
},[colorsId])




  const onpress =(item)=>{
    setValue(item.value);
    setIsFocus(false);
    colorId(item.value)
    colorName(item.label)
  }


  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16,marginBottom:5, color: "#000" }}>Car Colors</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'deepskyblue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
         onpress(item)
        }}
      />
    </View>
  );
};

export default ColorName;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // padding: 16,
    paddingTop:16,
    
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});