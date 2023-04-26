import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { FIREBASE_IMG } from '../firebaseConfig';
import { ref, listAll, getDownloadURL  } from "firebase/storage";


export default function PlantTimeLine(){

    const [timeAlign, setTimeAlign] = useState(true)
    const [imageUrlList, setImageUrlList] = useState([]);

    useEffect(()=>{
        const listRef  = ref(FIREBASE_IMG, 'camera_test_1/');
        // imgList = []

        const fetchImg = async () => {
            try {
                const res = await listAll(listRef);
                const imgList = [];

                for (const itemRef of res.items) {
                    const url = await getDownloadURL(itemRef);
                    const indexedDB = itemRef.name;
                    imgList.push({ key: indexedDB, url: url });
                }
                //console.log(imgList)
                imgList.sort((a, b) => (a.key > b.key) ? -1 : 1) // 오름차순은 1 : -1 로
                setImageUrlList(imgList)

            } catch(err) {
                console.log(err)
            }
        }
        fetchImg();
    },[])

    return (
        <View>
            <View style={styles.container2}>
                    <Text style={timeAlign == true ? styles.textOn : styles.textOff} onPress={()=>{setTimeAlign(true); setImageUrlList(imageUrlList.sort((a, b) => (a.key > b.key) ? -1 : 1))}}>최신 순으로</Text>
                    <Text>{"    "}</Text>
                    <Text style={timeAlign == true ? styles.textOff : styles.textOn} onPress={()=>{setTimeAlign(false); setImageUrlList(imageUrlList.sort((a, b) => (a.key > b.key) ? 1 : -1))}}>오래된 순으로</Text>
            </View>
            <ScrollView contentContainerStyle={{ alignItems: 'center', marginHorizontal: 30 }}>
                <View style={styles.container3}>
                    {/* {imgList.length < 6 ? imgList.map(renderItem):
                    imgList.map(d =>{
                        if (d.key < 6) {
                            return renderItem(d);
                        }
                    })} */}
                    {setImageUrlList ? imageUrlList.map(renderItem) : null}
                </View>
            </ScrollView>
        </View>
    )
}

const renderItem=(item) => {
    return(
        <Image key={item.key} source={{uri: item.url}} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, // 비율
      backgroundColor: '#EDEFE3',
      paddingHorizontal: 40,
      justifyContent: 'center'
    },
    container2: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
        marginTop: 20,
        marginLeft: 30,
    },
    container3: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    container4: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    textOn: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textOff: {
        fontSize: 20,
        color: 'gray',
    },
    image: {
        width: '45%',
        aspectRatio: 1,
        marginBottom: 30,
        borderColor: '#BDDC1C', 
        borderWidth: 3
    }
});