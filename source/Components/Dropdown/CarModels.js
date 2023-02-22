import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  { label: '2022', value: '1', },
  { label: '2021', value: '2' },
  { label: '2020', value: '3' },
  { label: '2019', value: '4' },
  { label: '2018', value: '5' },
];

const CarModels = ({modelId,modelYear,modelsId,modelsYear}) => {
  const [value, setValue] = useState(modelsId);
  const [isFocus, setIsFocus] = useState(false);

//   const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && { color: 'deepskyblue' }]}>
//            Car Models
//         </Text>
//       );
//     }
//     return null;
//   };
useEffect(()=>{
  setValue(modelsId)
},[modelsId])


  const onpress =(item)=>{
    setValue(item.value);
    setIsFocus(false);
    modelId(item.value)
    modelYear(item.label)
  }


  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Text style={{fontSize:16,fontWeight:'500',color:"#000"}}>Car Model</Text>
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

export default CarModels;

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