import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  { label: 'AUDI', value: '1', },
  { label: 'ALFA ROMEO', value: '2' },
  { label: 'ASTON MARTIN', value: '3' },
  { label: 'AURA', value: '4' },
  { label: 'BMW', value: '5' },
];

const CarNames = ({carId,setCarName,carNameId}) => {
  const [value, setValue] = useState(carNameId);
  const [isFocus, setIsFocus] = useState(false);


  useEffect(()=>{
    setValue(carNameId)
},[carNameId])
  



  const onpress =(item)=>{
    setValue(item.value);
    setIsFocus(false);
    carId(item.value)
    setCarName(item.label)
  }


  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Text style={{ fontSize: 16,marginBottom:5, color: "#000" }}>Car Names</Text>
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
        placeholder={!isFocus ? 'Select item' :'...' }
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
         onpress(item)
        }}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? 'blue' : 'black'}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};

export default CarNames;

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