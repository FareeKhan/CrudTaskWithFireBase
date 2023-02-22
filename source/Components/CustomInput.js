import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

const CustomInput = ({label,value,onChangeText,...props}) => {
    return (
        <View>
            <TextInput
                label={label}
                value={value}
                mode={'outlined'}
                onChangeText={onChangeText}
                style={styles.inputStyle}
                {...props}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    inputStyle: {
        marginTop: 20
    }
})