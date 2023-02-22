import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Button } from 'react-native-paper'
import { launchCamera } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import ImageCropPicker from 'react-native-image-crop-picker'
import CarNames from '../Components/Dropdown/CarNames'
import ColorName from '../Components/Dropdown/ColorName'
import CarModels from '../Components/Dropdown/CarModels'
import Iconic from 'react-native-vector-icons/Ionicons'

const EditModal = ({ navigation,route }) => {
    const { item } = route.params
    const [itemId, setItemId] = useState(item.id)

    const [registeration, setRegisteration] = useState(item?.registeration)
    const [image, setImage] = useState('')

    const [carNameId, setCarNameId] = useState('')
    const [carName, setCarName] = useState(item?.carName ? item.carName : '')

    const [carModelId, setCarModelId] = useState(item?.carModelId)
    const [modelYear, setModelYear] = useState(item?.modelYear)

    const [colorId, setColorId] = useState(item?.colorId)
    const [colorName, setColorName] = useState(item?.colorName)

    useEffect(() => {
        setCarNameId(item?.carNameId ? item.carNameId : '')
        setCarModelId(item?.carModelId)
        setColorId(item?.colorId)

    }, [item])

    const updateData = async () => {
        try {
            if (!registeration) {
                Alert.alert("Please Fill all fields")
            } else {
                await firestore().collection('ads').doc(itemId).update({
                    registeration,
                    carNameId,
                    carName,
                    carModelId,
                    modelYear,
                    colorId,
                    colorName,
                    image
                })
            }
            setRegisteration('')
            setCarNameId('')
            setCarName('')
            setCarModelId('')
            setModelYear('')
            setColorId('')
            setColorName('')

        } catch (error) {
            console.log(error)
        }
    }

    const takeImageFromGallery = async () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 150,
            cropping: true,
            mediaType: 'photo'
        }).then(res => {
            console.log(res)
            const uploadTask = storage().ref().child(`/items/${Date.now()}`).putFile(res.path)
            // NewCode
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == 100) {
                        alert('Image Uploaded')
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setImage(downloadURL);
                    });
                }
            );
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.headerContainer}>
                     <TouchableOpacity onPress={()=>navigation.goBack()}>
                         <Iconic name="arrow-back-outline" size={22}/>
                     </TouchableOpacity>
                     <Text style={styles.title}>Update Data</Text>
                </View>
                <View >
                    <Text style={{ fontSize: 16, fontWeight: '500', color: "#000" }}>Registeration No</Text>
                    <TextInput
                        placeholder="Registeration"
                        value={registeration}
                        onChangeText={setRegisteration}
                        style={styles.inputStyle}
                    />

                    <CarNames
                        carId={setCarNameId}
                        setCarName={setCarName}
                        carNameId={carNameId}
                        carName={carName}
                    />
                    <CarModels
                        modelId={setCarModelId}
                        modelYear={setModelYear}
                        modelsId={carModelId}
                        modelsYear={modelYear}
                    />

                    <ColorName
                        colorId={setColorId}
                        colorName={setColorName}
                        colorsId={colorId}
                        colorsName={colorName}
                    />
                    <View style={{ paddingTop: 20 }}>
                        {
                            image ?

                                <TouchableOpacity onPress={() => takeImageFromGallery()}>
                                    <Image style={{ width: 350, height: 150, borderRadius: 10 }} source={{ uri: image }} />
                                </TouchableOpacity>
                                :

                                <TouchableOpacity onPress={() => takeImageFromGallery()}>
                                    <Image style={{ width: 350, height: 150, borderRadius: 10 }} source={{ uri: item.image }} />
                                </TouchableOpacity>

                        }
                        <Button style={{ marginTop: 40 }} mode="contained" onPress={() => updateData()}>
                            Post
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default EditModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        backgroundColor: "#fff"


    },
    innerContainer: {
        // backgroundColor: "#cecece",
        // paddingHorizontal:20,
        // paddingTop:20,
        // // width: 320,
        // // padding: 30,
        // borderRadius: 20
    },
    headerContainer:{
     flexDirection:"row",
     alignItems:"center",
     marginBottom: 15

    },
    title: {
        fontSize: 24,
        textAlign: "center",
        paddingLeft:100
    },
    inputStyle: {
        // marginTop: 5
        backgroundColor: "#fff",
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 16,
        borderColor: '#00000050',
        borderRadius: 10
    }
})