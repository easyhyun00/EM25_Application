import { React, useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { Button, SpeedDial  } from '@rneui/base';
import * as Linking from 'expo-linking';
import { View, Text, StyleSheet, Modal, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { FIREBASE_DB } from '../firebaseConfig';
import { doc, getDoc,  onSnapshot, updateDoc } from 'firebase/firestore';
import { PlantInfoModal } from '../components/PlantInfoModal'
import { PlantAddModal } from '../components/PlantAddModal'

export default function PlantInfo() {

    const route = useRoute();

    const [plantInfo, setPlantInfo] = useState(false); // DB에 해당 사용자가 식물을 등록했는지 true false
    const [plantName, setPlantName] = useState(''); // 사용자가 등록한 식물 이름
    const [plantModal, setPlantModal] = useState('');

    const [modalVisible, setModalVisible] = useState(false); // 식물 정보 모달 열고 닫기
    const [modalVisible2, setModalVisible2] = useState(false); // 식물 추가 모달 열고 닫기

    const [humidity, setHumidity] = useState('') // 온실 습도
    const [temperature, setTemperature] = useState('') // 온실 온도
    const [light, setLight] = useState('') // 온실 조도

    const [humidityInfo, setHumidityInfo] = useState(100) // 등록한 식물의 습도
    const [temperHighInfo, setTemperHighInfo] = useState(100) // 등록한 식물의 최대 온도
    const [temperLowInfo, setTemperLowInfo] = useState('') // 등록한 식물의 최소 온도
    const [lightInfo, setLightInfo] = useState("????") // 등록한 식물의 조도

    const [open, setOpen] = useState(false); // SpeedDial(오른쪽 아래 동그란 거) 닫기 열기

    useEffect(() => {
        getData(route.params.uid) // 해당 사용자에 대해 정보 가져오기
        getFarmInfo() // 온실에서 측정한 데이터 값 가져오기
    },[]);

    // 센서값 가져오기
    const getFarmInfo = () => {
        onSnapshot(doc(FIREBASE_DB, "farminformation", "tem_hum"), (doc) => {
            setHumidity(doc.data().humidity); // 습도
            setTemperature(doc.data().temperature); // 온도
        });
        onSnapshot(doc(FIREBASE_DB, "farminformation", "light"), (doc) => {
            setLight(doc.data().light) // 조도
        });
    }

    // 사용자 정보 가져오기
    const getData = async (uid) => { // 데이터 읽기
        const docRef = doc(FIREBASE_DB, "Users", uid)
        const docSnap = await getDoc(docRef);

        // 해당 유저가 존재하면
        if (docSnap.exists()) {
            setPlantInfo(docSnap.data().plantRegistration); // 식물 등록했는지 true false
            setPlantName(docSnap.data().plantName) // 등록한 식물 이름
            if(docSnap.data().plantName !== "") { // 식물을 등록했으면
                getPlantInfo(docSnap.data().plantNo) // 등록한 식물 번호로 식물 정보 가져오기
            }
        }
    }

    // 해당 번호에 대한 식물 정보 가져오기
    const getPlantInfo = async (plantNo) => {
        const docRef = doc(FIREBASE_DB, "Plants", plantNo)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) { // 등록한 식물이 DB에 존재하면
            setPlantModal(docSnap.data());
            setHumidityInfo(docSnap.data().plantHumidity) // 습도값
            setTemperHighInfo(docSnap.data().plantTemperatureHigh) // 온도값
            setTemperLowInfo(docSnap.data().plantTemperatureLow) // 온도값
            const lightinfo = docSnap.data().plantLight // 조도값
            if (lightinfo == 1) {
                setLightInfo(1500)
            } else if (lightinfo == 2) {
                setLightInfo(800)
            } else {
                setLightInfo(300)
            }
        }
    }

    // 모달
    const ModalInfo = (
        <View>
            <Button
                title="닫기"
                onPress={() => {plantInfo == false ? 
                    plantName != '' ? (setModalVisible2(!modalVisible2), setPlantInfo(true)) : setModalVisible2(!modalVisible2) : setModalVisible(!modalVisible)}}
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
            {plantInfo == false ? <PlantAddModal 
            modalVisible2={modalVisible2} setModalVisible2={setModalVisible2} setPlantInfo={setPlantInfo} userUid={route.params.uid} setPlantName={setPlantName}
            setPlantModal={setPlantModal} setHumidityInfo={setHumidityInfo} setTemperHighInfo={setTemperHighInfo} setTemperLowInfo={setTemperLowInfo} setLightInfo={setLightInfo} /> 
            : <PlantInfoModal plantModal={plantModal} />}
        </View> 
    )

    // DB에 식물 정보 삭제
    const deletePlantResgister = async () => {
        setPlantInfo(false)
        const washingtonRef = doc(FIREBASE_DB, "Users", route.params.uid);
        await updateDoc(washingtonRef, {
            plantRegistration: false,
            plantNo:"",
            plantName:"",
        });

    }

    // 메인
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.plantName}>
                    {plantInfo == false ? "식물 정보가 없습니다." : "🪴 " + plantName + " 🪴"}
                </Text>
            </View>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.progressContainer}>
                        <AnimatedCircularProgress // 온도 그래프
                            size={105}
                            width={12}
                            fill={plantInfo == false ? 0 : temperature*(100/40)}
                            rotation={0}
                            tintColor={
                                temperature > temperHighInfo ? '#FF0000' :
                                temperature < temperLowInfo ? '#1E90FF' :
                                '#52E020'
                            }
                            backgroundColor="#D9D9D9">
                        </AnimatedCircularProgress>
                        <View style={styles.textContainer}>
                            <Text style={styles.temperatureText}>온도</Text>
                            <Text style={styles.temperatureValue}>{plantInfo == false ? 0 : temperature} ℃</Text>
                        </View>
                    </View> 
                    <View style={styles.infoContainer}>   
                        {
                            plantInfo == false ? <Text style={styles.infoText1}>온도 없음 </Text> :
                            temperature > temperHighInfo ? <Text style={styles.infoText1Red}>온도 높음 </Text> :
                            temperature < temperLowInfo ? <Text style={styles.infoText1Blue}>온도 낮음 </Text> :
                            <Text style={styles.infoText1}>만족 </Text>
                        }  
                        {
                            plantInfo == false ? <Text style={styles.infoText2}>식물 정보을 등록하세요 !!</Text> : 
                            <Text style={styles.infoText2}>적정 온도 {temperLowInfo} ~ {temperHighInfo} ℃</Text>
                        }                      
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.progressContainer}>
                        <AnimatedCircularProgress // 습도 그래프
                            size={105}
                            width={12}
                            fill={plantInfo == false ? 0 : parseInt(humidity)}
                            rotation={0}
                            tintColor={
                                humidityInfo === '70% 이상'
                                  ? humidity >= 70
                                    ? '#52E020'
                                    : '#278BFF'
                                  : humidity >= 40 && humidity <= 70
                                  ? '#52E020'
                                  : humidity < 40
                                  ? '#278BFF'
                                  : '#F54040'
                            }
                            backgroundColor="#D9D9D9">
                        </AnimatedCircularProgress>
                        <View style={styles.textContainer}>
                            <Text style={styles.temperatureText}>습도</Text>
                            <Text style={styles.temperatureValue}>{plantInfo == false ? 0 : humidity} %</Text>
                        </View>
                    </View> 
                    <View style={styles.infoContainer}>   
                        {
                            plantInfo == false ? <Text style={styles.infoText1}>습도 없음 </Text> :
                            humidityInfo === '70% 이상'
                            ? humidity >= 70
                                ? <Text style={styles.infoText1}>만족</Text>
                                : <Text style={styles.infoText1Blue}>습도 낮음</Text>
                            : humidity >= 40 && humidity <= 70
                            ? <Text style={styles.infoText1}>만족</Text>
                            : humidity < 40
                            ? <Text style={styles.infoText1Blue}>습도 낮음</Text>
                            : <Text style={styles.infoText1Red}>습도 높음</Text>
                        }
                        {
                            plantInfo == false ? <Text style={styles.infoText2}>식물 정보을 등록하세요 !!</Text> :
                            <Text style={styles.infoText2}>적정 습도 {humidityInfo}</Text>
                        }
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.progressContainer}>
                        <AnimatedCircularProgress // 조도 그래프
                            size={105}
                            width={12}
                            fill={plantInfo == false ? 0 : light/10}
                            rotation={0}
                            tintColor={light >= lightInfo ? '#52E020' : '#278BFF'}
                            backgroundColor="#D9D9D9">
                        </AnimatedCircularProgress>
                        <View style={styles.textContainer}>
                            <Text style={styles.temperatureText}>광도</Text>
                            <Text style={styles.temperatureValue}>{plantInfo == false ? 0 : light} LUX</Text>
                        </View>
                    </View> 
                    <View style={styles.infoContainer}>   
                        {
                            plantInfo == false ? <Text style={styles.infoText1}>광도 없음 </Text> :
                            light >= lightInfo ? <Text style={styles.infoText1}>만족</Text> :
                            <Text style={styles.infoText1Blue}>광도 낮음</Text>
                        }
                        {
                            plantInfo == false ? <Text style={styles.infoText2}>식물 정보을 등록하세요 !!</Text> :
                            <Text style={styles.infoText2}>적정 광도 {lightInfo} LUX 이상</Text>
                        }
                    </View>
                </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {
                    plantInfo == false ? <Text style={{fontSize: 25, marginBottom: 5, marginTop: 15, fontWeight:'bold',color: 'black'}}>식물 정보를 등록해 정보를 얻으세요 :)</Text> : 
                   <Text style={{fontSize: 25, marginBottom: 5, marginTop: 15, fontWeight:'bold',color: 'green'}}>현재 상태를 확인해주세요 :)</Text>
                }
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
                        marginTop: 25,
                    }}
                />
            </View>
                <SpeedDial
                    isOpen={open}
                    icon={{ name: 'info', color: '#fff' }}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(!open)}
                    color='#F26A8B'>
                    <SpeedDial.Action
                        icon={<AntDesign name="message1" size={21} color="#fff" />}
                        title="1 : 1 문의"
                        onPress={() => Linking.openURL("https://pf.kakao.com/_JXMxgxj")}
                    />
                    {plantInfo == true ? 
                    <View>
                        <SpeedDial.Action
                            icon={{ name: 'delete', color: '#fff',size: 22 }}
                            title="식물 삭제"
                            onPress={() => 
                                Alert.alert('식물 삭제', '등록한 식물 정보를 삭제하시겠습니까?', [
                                    {text: '아니오',onPress: () => setOpen(!open), style: 'cancel',},
                                    {text: '네', onPress: () => {setOpen(!open), deletePlantResgister()}},
                                ])
                            }
                        />
                        <SpeedDial.Action
                            icon={{ name: 'edit', color: '#fff',size: 22 }}
                            title="식물 수정"
                            onPress={() => 
                                {
                                    setPlantInfo(false);
                                    setModalVisible2(true);
                                    setOpen(!open) 
                                }
                            }
                        /> 
                    </View>
                    : null}
                </SpeedDial>
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

const styles = StyleSheet.create({
    container: {
      flex: 1, // 비율
      backgroundColor: '#EDEFE3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    plantName: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: -25,
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
    progress: {
        height: 100,
        width: 140,
    },
    textContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      },
      temperatureText: {
        fontSize: 14,
        color: '#000',
      },
      temperatureValue: {
        fontSize: 24,
        color: '#000',
        marginLeft: 5,
        fontWeight: 'bold'
      },
      progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
      },
      infoContainer: {
        marginLeft: 20,
        justifyContent: 'center',
      },
      infoText1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
      },
      infoText1Blue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#1E90FF',
      },
      infoText1Red: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF0000',
        marginBottom: 5,
      },
      infoText2: {
        fontSize: 18,
        color: 'gray',
      },
});