import { Alert, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Iconic from 'react-native-vector-icons/Ionicons'

const HomeScreen = ({ navigation }) => {
    const [allData, setAllData] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        getData()
    }, [allData])

    // Get Data from FireStore
    const getData = async () => {
        const query = await firestore().collection('ads').get()
        const result = query.docs.map((snap) => snap.data())
        setAllData(result)
    }

    // Delete Function
    const deleteItem = (value) => {
        Alert.alert('Alert Title', 'Do you want to Delete this List?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'NO',
            },
            {
                text: 'YES', onPress: () => {
                    firestore().collection('ads').doc(value).delete().then(
                        console.log('Deleted')
                       
                    ),
                    getData()
                }
            },
        ]);
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onLongPress={() => deleteItem(item.id)}
                onPress={() => navigation.navigate('EditScreen', {
                    item: item
                })}
                style={styles.cardContainer}
            >
                {
                    item.image ?
                    <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 50 }} />
                    :
                    <Image source={require('../../assets/noImage.png')} style={{ width: 80, height: 80, borderRadius: 50 }} />

                }
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.headerTitle}>{item.carName}</Text>
                        <Text style={styles.titleDes}>{item.registeration}</Text>
                        <Text style={styles.yearText}>{item.modelYear}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditScreen', {
                        item: item,
                        docId: docId
                    })}>
                        <Iconic name="arrow-forward-outline" size={25} />
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        )
    }

    const refreshData = async () => {
        setRefresh(true)
        try {
            const query = await firestore().collection('ads').get()
            const result = query.docs.map((snap) => snap.data())
            setAllData(result)
            setRefresh(false)
        } catch (error) {
          console.log(error)
          setRefresh(false)
          
        }
    }


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={'deepskyblue'} />
            <Text style={styles.title}>Registered Cars</Text>

            {
                allData.length > 0 ?
                    <View style={styles.card}>
                        <FlatList
                            data={allData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            refreshing={refresh}
                            onRefresh={() => refreshData()}
                        />
                    </View>
                    :
                    <View style={styles.noDataMsg}>
                        <Text style={{ fontSize: 16 }}>No Car Registered</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('CreateAd')}>
                             <Text style={{ color:'deepskyblue' }}>Click Here to Register car</Text>
                        </TouchableOpacity>
                    </View>


            }


        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // paddingTop: 10,
        paddingHorizontal: 24,
        backgroundColor: "#ffffff80"
    },
    title: {
        fontSize: 24,
        color: "#000",
        fontWeight: "500",
        textAlign: "center",
        fontStyle: "italic",
        paddingVertical:20
    
    },
    card: {
        // marginTop: 30
    },
    cardContainer: {
        padding: 5,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 10,

    },
    contentContainer: {
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 18,
        color: '#000',
        fontWeight: "600"
    },
    titleDes: {
        fontWeight: '500'
    },
    yearText: {
        fontSize: 12
    },
    noDataMsg: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})