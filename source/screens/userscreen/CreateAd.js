import { Alert, TextInput, Image, KeyboardAvoidingView, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import CarNames from '../../Components/Dropdown/CarNames';
import CarModels from '../../Components/Dropdown/CarModels';
import ColorName from '../../Components/Dropdown/ColorName';
import ImageCropPicker from 'react-native-image-crop-picker';

const {width}=Dimensions.get('screen')
const imgWidth = width/1.2+10

const CreateAd = ({navigation}) => {
  const [registeration, setRegisteration] = useState('')
  const [image, setImage] = useState('')

  const [carNameId, setCarNameId] = useState('')
  const [carName, setCarName] = useState('')

  const [carModelId, setCarModelId] = useState('')
  const [modelYear, setModelYear] = useState('')

  const [colorId, setColorId] = useState('')
  const [colorName, setColorName] = useState('')

  const [isLoader, setIsLoader] = useState(false)

  const createAds = async (data) => {
    setIsLoader(true)
    try {
      if (!registeration || !carName || !modelYear || !colorName   ) {
        Alert.alert("Please Fill all fields")
        console.log(!registeration || !carName  || !modelYear  || !colorName )
      } else {
        await firestore().collection('ads').add(data).then((snapshot) => {
          data.id = snapshot.id
          snapshot.set(data)
        })
        Alert.alert('Alert Title', 'Data added Successfully', [
          {
              text: 'OK', onPress: () => {
                  navigation.navigate('HomeScreen')
              }
          },
      ]);
      setRegisteration('')
      setCarNameId('')
      setCarName('')
      setCarModelId('')
      setModelYear('')
      setColorId('')
      setColorName('')
      setImage('')
      }

      setIsLoader(false)
    } catch (error) {
      console.log(error)
      setIsLoader(false)
    }
  }

  const dataSetter = () => {
    var data = {
      registeration,
      carNameId,
      carName,
      carModelId,
      modelYear,
      colorId,
      colorName,
      image,
    }
    createAds(data)
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
            alert('Image Uploaded Successfully')
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImage(downloadURL);
          });
        }
      );
    }).catch((error) => {
      console.log('---',error)
    })
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.title}>Register Car</Text>
      <View  style={{paddingBottom:100}}>
        <Text style={styles.inputTitle}>Registeration No</Text>
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

        />

        <CarModels
          modelId={setCarModelId}
          modelYear={setModelYear}
          modelsId={carModelId}

        />

        <ColorName
          colorId={setColorId}
          colorName={setColorName}
          colorsId={colorId}
        />

        <View style={{ paddingTop: 20 }}>
        {
            image &&
            <View style={{ marginVertical: 10 }}>
              <Image source={{ uri: image }} style={{ width: imgWidth, height: 150, borderRadius: 10 }} resizeMode='cover' />
            </View>
          }
          <Button icon="camera" mode="contained" onPress={() => takeImageFromGallery()}>
            Upload Image
          </Button>

          {isLoader ?
            <ActivityIndicator size={30} color={'deepskyblue'}  style={{ marginTop: 20 }} />
            :
            <Button disabled={image ? false : true} style={{ marginTop: 20 }} mode="contained" onPress={() => dataSetter()}>
              Post
            </Button>
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateAd

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15,
     fontWeight: '500',
     color:"#000"

  },
  inputTitle:{ 
    fontSize: 16,
      color: "#000" ,
      marginBottom:5

    },
  inputStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 16,
    borderColor: '#00000050',
    borderRadius: 10
  }
})