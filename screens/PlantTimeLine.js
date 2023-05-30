import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableHighlight, Modal, ActivityIndicator, Alert } from 'react-native'
import { FIREBASE_IMG, FIREBASE_DB } from '../firebaseConfig';
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { Button } from 'react-native-elements';
import { doc, getDoc } from 'firebase/firestore';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Octicons } from '@expo/vector-icons';

export default function PlantTimeLine(){

    const scrollViewRef = useRef();

    const [timeAlign, setTimeAlign] = useState(true)
    const [imageUrlList, setImageUrlList] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [selectedImageDate, setSelectedImageDate] = useState(null);
    const [selectedImageKey, setSelectedImageKey] = useState(null);

    const [yellowList, setYellowList] = useState([])

    // 로딩화면
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const listRef  = ref(FIREBASE_IMG, 'camera_test_1/');

        const fetchImg = async () => {
            try {
                const res = await listAll(listRef);
                const imgList = [];

                for (const itemRef of res.items) {
                    const url = await getDownloadURL(itemRef);
                    const indexedDB = itemRef.name;

                    const metadata = await getMetadata(itemRef);  // 파일 메타데이터 가져오기
                    const createdAt = metadata.timeCreated; 

                    imgList.push({ key: indexedDB, url: url, date: createdAt });
                }
                const newDataList = imgList.map((item, index) => {
                    return {
                      ...item,
                      key: index + 1
                    };
                });
                newDataList.sort((a, b) => (a.key > b.key) ? -1 : 1) // 오름차순 1 : -1
                setImageUrlList(newDataList)

            } catch(err) {
                console.log(err)
            }
        }

        const getYellow = async () => {
            const docRef = doc(FIREBASE_DB, "farminformation", "leaf")
            const docSnap = await getDoc(docRef);
            setYellowList(Object.keys(docSnap.data()))
        };

        Promise.all([fetchImg(), getYellow()]).then(() => setLoading(false));
    },[])

    const openModal = (uri,iTemDate,key) => {

        const dateObj = new Date(iTemDate);

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
        const date = dateObj.getDate();
        const hour = dateObj.getHours();
        const minute = dateObj.getMinutes();

        const formattedDate = `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분`;

        setSelectedImageUri(uri);
        setSelectedImageDate(formattedDate);
        setSelectedImageKey(key);
        setModalVisible(true);
    }

    const renderItem=(item) => {
        return(
            <TouchableHighlight onPress={() => openModal(item.url,item.date,item.key)} key={item.key} style={{marginBottom: 30}}>
                <Image source={{uri: item.url}} style={styles.image} />
            </TouchableHighlight> 
        )
    }

    const shareImage = async () => {
        Alert.alert('식물 관리 시스템🪴', '이미지 공유 준비 중...', [
            {text: 'OK'},
        ]);
        const localUri = `${FileSystem.documentDirectory}${selectedImageUri.split('/').pop()}`;

        const { uri } = await FileSystem.downloadAsync(selectedImageUri, localUri);

        if (!(await Sharing.isAvailableAsync())) {
          alert(`이 기기에서는 이미지 공유를 사용할 수 없습니다.`);
          return;
        }
        
        await Sharing.shareAsync(uri);
    }

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                    <Text style={timeAlign == true ? styles.textOn : styles.textOff} onPress={()=>{setTimeAlign(true); setImageUrlList(imageUrlList.sort((a, b) => (a.key > b.key) ? -1 : 1)); scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});}}>최신 순으로</Text>
                    <Text>{"    "}</Text>
                    <Text style={timeAlign == true ? styles.textOff : styles.textOn} onPress={()=>{setTimeAlign(false); setImageUrlList(imageUrlList.sort((a, b) => (a.key > b.key) ? 1 : -1)); scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});}}>오래된 순으로</Text>
            </View>
            {loading ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                <ActivityIndicator size="large" color="green" />
                <Text style={{fontSize: 20}}>나의 식물 사진 가져오는 중 . . .</Text>
            </View> :
            <>
                <ScrollView ref={scrollViewRef} contentContainerStyle={{ alignItems: 'center', marginHorizontal: 30 }}>
                    <View style={styles.container3}>
                        {setImageUrlList ? imageUrlList.map(renderItem) : null}
                    </View>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 20,marginBottom: 7,marginLeft: 5,fontWeight:"bold",color:"green", marginRight: 15}}># {selectedImageKey}</Text>
                            <Text style={styles.dateText}>{selectedImageDate}</Text>
                            <Octicons
                                name="share"
                                size={20}
                                color="green"
                                onPress={shareImage}
                                style={{marginBottom: 7, marginRight: 7}}
                            />
                        </View>
                        <Image source={{uri: selectedImageUri}} style={styles.modalImage} />
                        {selectedImageUri ? yellowList.includes(selectedImageUri.split("F")[1].split(".")[0]) ? 
                            <Text style={{marginTop: 7}}>    
                                <Text style={{fontSize: 17, marginTop: 7}}>지난 주에 비해</Text> 
                                <Text style={{fontSize: 19, marginTop: 7, color: "#BDDC1C", fontWeight: 'bold'}}> 노란 잎</Text>
                                <Text style={{fontSize: 17, marginTop: 7}}> 비율이 증가하였습니다😥</Text>
                            </Text>
                            : null : null
                        }
                        <Button 
                            title="닫기"
                            titleStyle={{ 
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: 'black',
                            }}
                            buttonStyle={{
                                backgroundColor: '#DBEA8D',
                                borderColor: 'transparent',
                                borderRadius: 30,
                                marginTop: 10,
                            }}
                            containerStyle={{
                                width: 65,
                            }}
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                    </View>
                </Modal>
            </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, // 비율
      backgroundColor: '#EDEFE3',
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
        //width: '45%',
        width: 145, // 크기 조정
        height: 145,
        aspectRatio: 1,
        borderColor: '#BDDC1C', 
        borderWidth: 3,
    },
    modalImage: {
        width: 300,
        height: 235,
        borderColor: '#BDDC1C', 
        borderWidth: 3,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        //padding: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      dateText: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 7,
        marginLeft: 6,
      }
});