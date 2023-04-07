import { React, useState, useEffect } from 'react'
import { Button } from '@rneui/base';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet, Image, Modal, FlatList } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import { doc, getDoc, updateDoc, collection, getDocs, query  } from 'firebase/firestore';

export default function PlantInfo() {

    const [userUid, setUserUid] = useState('');
    const [plantInfo, setPlantInfo] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    // 데이터베이스 읽기
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
          if(user) {
            console.log(user.uid);
            setUserUid(user.uid);
            getData(user.uid);
          }
        })
    }, []);

    // 사용자 정보 가져오기
    const getData = async (uid) => { // 데이터 읽기
        const docRef = doc(FIREBASE_DB, "Users", uid)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            console.log(docSnap.data().plantRegistration);
            console.log(docSnap.data().plantNo);
            setPlantInfo(docSnap.data().plantRegistration);
        }
    }

    const updateData = async (boolean) => {
        setPlantInfo(boolean);
        const washingtonRef = doc(FIREBASE_DB, "Users", userUid);
        await updateDoc(washingtonRef, {
            plantRegistration: boolean
        });
    }

    const ModalInfo = (
        <View>
            <Button
                title="닫기"
                onPress={() => {plantInfo == false ? setModalVisible2(!modalVisible2) : setModalVisible(!modalVisible)}}
                buttonStyle={{
                    backgroundColor: '#DBEA8D',
                }}
                titleStyle={{ 
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'black',
                }}
                containerStyle={{
                    marginBottom: 10,
                }}
            >
            </Button>
            {plantInfo == false ? <PlantAddModal /> : <PlantInfoModal />}
            {plantInfo == true ? null : (
                <View style={{alignItems: 'center'}}>
                    <Button 
                        title="등록하기"
                        // 여기서 plantInfo값 true를 db에 업데이트
                        onPress={() => {setModalVisible2(!modalVisible2), updateData(true)}}
                        titleStyle={{ 
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: 'black',
                        }}
                        buttonStyle={{
                            backgroundColor: '#DBEA8D',
                            borderColor: 'transparent',
                            borderRadius: 30,
                        }}
                        containerStyle={{
                            width: 170,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                    />
                </View>) }
        </View> 
    )

    return (
        <View style={styles.container}>
            <View>
                { plantInfo == false ? 
                <View style={styles.container1}>
                    <Text style={styles.question}>?</Text>
                </View> : 
                <Image 
                    source={{uri: "https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg"}} 
                    style={{width: 230, height: 210, marginBottom: 35, marginTop: -20, borderColor: '#BDDC1C', borderWidth: 5}} >                    
                </Image> }
            </View>
            <View>
                <Text style={styles.plantName}>
                    {plantInfo == false ? "식물 정보가 없습니다." : "🌿 대만 고무 나무 🌿"}
                </Text>
            </View>
            <View>
                <Text style={styles.plantStatus}>🌡️ 온도 : ??? ℃</Text>
                <Text style={styles.plantStatus}>💧 습도 : ??? %</Text>
                <Text style={styles.plantStatus}>☀️ 광 : ??? LUX</Text>
            </View>
            <View>
                <Button 
                    title={plantInfo == false ? "식물 정보 등록하기" : "식물 정보 더 보기"}
                    onPress={() => {plantInfo == false ? setModalVisible2(true) : setModalVisible(true)}}
                    titleStyle={{ 
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: 'black',
                    }}
                    buttonStyle={{
                        backgroundColor: 'white',
                        borderColor: 'transparent',
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 170,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                />
            </View>
            <Modal
                    animationType="slide"
                    presentationStyle={"formSheet"}
                    transparent={false}
                    visible={plantInfo == false ? modalVisible2 : modalVisible}
                    onRequestClose={() => {plantInfo == false ? setModalVisible2(!modalVisible2) : setModalVisible(!modalVisible)}}> 
                    <View>
                        {ModalInfo}
                    </View>
            </Modal>
        </View>
    )
}

const PlantInfoModal = () => {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 50}}>여기에 식물 정보</Text>
        </View>
    )
}

const PlantAddModal = () => {

    useEffect(() => {
        getPlant();
    },[]);

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const updateSearch = (search) => {
        setSearch(search);
        getPlant();
      };

    const renderPlant = ({ item }) => (
        <View key={item.name}>
          <Text>{item.name}</Text>
        </View>
    );

    const getPlant = async () => {

        const usersCollectionRef = collection(FIREBASE_DB, "Plants");

        const qry = await query(usersCollectionRef);
        const data = await getDocs(qry);
        const newData = data.docs.map(doc => ({
        ...doc.data()
        }))
        const result = [];
        for (let index = 0; index < 5; index++) {
            result.push({name:newData[index].plantName});
        }
        setSearchResults(result);
        console.log(result);
    }

    return (
        <View style={{marginHorizontal: 30}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 50, alignItems: 'center'}}>나의 식물 정보 등록하기</Text>
            <SearchBar
                lightTheme
                placeholder="등록할 식물을 입력하세요."
                onChangeText={updateSearch}
                value={search}
                containerStyle={{marginVertical: 30, borderRadius: 20, backgroundColor: '#DBEA8D'}}
                inputContainerStyle={{backgroundColor: 'white'}}
                round
            />
            <FlatList
                data={searchResults}
                renderItem={renderPlant}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, // 비율
      backgroundColor: '#EDEFE3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    plantName: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    plantStatus: {
        fontSize: 28,
        fontWeight: 500,
        marginBottom: 30,
    },
    container1: {
        width: 230, 
        height: 210, 
        marginBottom: 35, 
        marginTop: -20,
        backgroundColor: '#CCCCCC',
        justifyContent: 'center',
        alignItems: 'center',
      },
      question: {
        fontSize: 100,
        fontWeight: 'bold',
        color: '#000000',
      },
});