// import { React, useState, useEffect } from 'react'
// import { useRoute } from '@react-navigation/native';
// import { Button } from '@rneui/base';
// import { View, Text, StyleSheet, Modal } from 'react-native';
// import { ProgressCircle } from 'react-native-svg-charts';
// import { FIREBASE_DB } from '../firebaseConfig';
// import { doc, getDoc } from 'firebase/firestore';
// import { PlantInfoModal } from '../components/PlantInfoModal'

// export default function PlantInfo() {

//     const route = useRoute();

//     const [plantInfo, setPlantInfo] = useState(false);
//     const [plantName, setPlantName] = useState('');
//     const [plantModal, setPlantModal] = useState('');

//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalVisible2, setModalVisible2] = useState(false);

//     const [humidity, setHumidity] = useState('')
//     const [temperature, setTemperature] = useState('')
//     const [light, setLight] = useState('')

//     const [humidityInfo, setHumidityInfo] = useState('')
//     const [temperHighInfo, setTemperHighInfo] = useState('')
//     const [temperLowInfo, setTemperLowInfo] = useState('')
//     const [lightInfo, setLightInfo] = useState("????")

//     // 데이터베이스 읽기
//     useEffect(() => {
//         getData(route.params.uid)
//         getFarmInfo()
//     }, []);

//     // 센서값 가져오기
//     const getFarmInfo = () => {
//         // onSnapshot(doc(FIREBASE_DB, "farminformation", "tem_hum"), (doc) => { // 온습도
//         //     setHumidity(doc.data().humidity);
//         //     setTemperature(doc.data().temperature);
//         // });
//         // onSnapshot(doc(FIREBASE_DB, "farminformation", "light"), (doc) => { // 조도
//         //     setLight(doc.data().light)
//         // });
//         setHumidity(30)
//         setTemperature(25.1)
//         setLight(800)
//     }

//     // 사용자 정보 가져오기
//     const getData = async (uid) => { // 데이터 읽기
//         const docRef = doc(FIREBASE_DB, "Users", uid)
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             setPlantInfo(docSnap.data().plantRegistration);
//             setPlantName(docSnap.data().plantName)
//             if(docSnap.data().plantName !== "") {
//                 getPlantInfo(docSnap.data().plantNo)
//             }
//         }
//     }

//     // 해당 번호에 대한 식물 정보 가져오기
//     const getPlantInfo = async (plantNo) => {
//         const docRef = doc(FIREBASE_DB, "Plants", plantNo)
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             setPlantModal(docSnap.data());
//             setHumidityInfo(docSnap.data().plantHumidity)
//             setTemperHighInfo(docSnap.data().plantTemperatureHigh)
//             setTemperLowInfo(docSnap.data().plantTemperatureLow)
//             const lightinfo = docSnap.data().plantLight
//             if (lightinfo == 1) {
//                 setLightInfo(1500)
//             } else if (lightinfo == 2) {
//                 setLightInfo(800)
//             } else {
//                 setLightInfo(300)
//             }
//         }
//     }

//     // 모달
//     const ModalInfo = (
//         <View>
//             <Button
//                 title="닫기"
//                 onPress={() => {setModalVisible(!modalVisible)}}
//                 buttonStyle={{
//                     backgroundColor: '#DBEA8D',
//                 }}
//                 titleStyle={{ 
//                     fontWeight: 'bold',
//                     fontSize: 20,
//                     color: 'black',
//                 }}
//                 containerStyle={{
//                     marginBottom: 10,
//                 }}
//             >
//             </Button>
//             <PlantInfoModal plantModal={plantModal} />
//         </View> 
//     )

//     // 메인
//     return (
//         <View style={styles.container}>
//             <View>
//                 <Text style={styles.plantName}>🪴 {plantName} 🪴</Text>
//             </View>
//             <View>
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={styles.progressContainer}>
//                         <ProgressCircle
//                             style={styles.progress}
//                             progress={temperature/40}
//                             progressColor={
//                                 temperature > temperHighInfo ? '#FF0000' :
//                                 temperature < temperLowInfo ? '#1E90FF' :
//                                 '#52E020'
//                             }
//                             backgroundColor={'#D9D9D9'}
//                             strokeWidth={10}
//                         >
//                         </ProgressCircle>
//                         <View style={styles.textContainer}>
//                             <Text style={styles.temperatureText}>온도</Text>
//                             <Text style={styles.temperatureValue}>{temperature}℃</Text>
//                         </View>
//                     </View>
//                     <View style={styles.infoContainer}>   
//                             {
//                                temperature > temperHighInfo ? <Text style={styles.infoText1Red}>온도 높음 </Text> :
//                                temperature < temperLowInfo ? <Text style={styles.infoText1Blue}>온도 낮음 </Text> :
//                                <Text style={styles.infoText1}>만족 </Text>
//                             }                        
//                             <Text style={styles.infoText2}>적정 온도 {temperLowInfo} ~ {temperHighInfo} ℃</Text>
//                     </View>
//                 </View>
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={styles.progressContainer}>
//                         <ProgressCircle
//                             style={styles.progress}
//                             progress={humidity/100}
//                             progressColor={
//                                 humidityInfo === '70% 이상'
//                                   ? humidity >= 70
//                                     ? '#52E020'
//                                     : '#278BFF'
//                                   : humidity >= 40 && humidity <= 70
//                                   ? '#52E020'
//                                   : humidity < 40
//                                   ? '#278BFF'
//                                   : '#F54040'
//                               }
//                             backgroundColor={'#D9D9D9'}
//                             strokeWidth={10}
//                         >
//                         </ProgressCircle>
//                         <View style={styles.textContainer}>
//                                 <Text style={styles.temperatureText}>습도</Text>
//                                 <Text style={styles.temperatureValue}>{humidity}%</Text>
//                         </View>
//                     </View>
//                     <View style={styles.infoContainer}>
//                             {
//                                humidityInfo === '70% 이상'
//                                ? humidity >= 70
//                                  ? <Text style={styles.infoText1}>만족</Text>
//                                  : <Text style={styles.infoText1Blue}>습도 낮음</Text>
//                                : humidity >= 40 && humidity <= 70
//                                ? <Text style={styles.infoText1}>만족</Text>
//                                : humidity < 40
//                                ? <Text style={styles.infoText1Blue}>습도 낮음</Text>
//                                : <Text style={styles.infoText1Red}>습도 높음</Text>
//                             }
//                             <Text style={styles.infoText2}>적정 습도 {humidityInfo}</Text>
//                     </View>
//                 </View>
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={styles.progressContainer}>
//                         <ProgressCircle
//                             style={styles.progress}
//                             progress={light/800}
//                             progressColor={light >= lightInfo ? '#52E020' : '#278BFF'}
//                             backgroundColor={'#D9D9D9'}
//                             strokeWidth={10}
//                         >
//                         </ProgressCircle>
//                         <View style={styles.textContainer}>
//                                     <Text style={styles.temperatureText}>광도</Text>
//                                     <Text style={styles.temperatureValue}>{light} LUX</Text>
//                         </View>
//                     </View>
//                     <View style={styles.infoContainer}>
//                             {
//                                light >= lightInfo ? <Text style={styles.infoText1}>만족</Text> :
//                                <Text style={styles.infoText1Blue}>광도 낮음</Text>
//                             }
//                             <Text style={styles.infoText2}>적정 광도 {lightInfo} LUX 이상</Text>
//                     </View>
//                 </View>
//             </View>
//             <View style={{alignItems: 'center', justifyContent: 'center'}}>
//                 <Text style={{fontSize: 25, marginBottom: 5, marginTop: 15, fontWeight:'bold',color: 'green'}}>(미완성)모든 상태를 만족합니다 :)</Text>
//             </View>
//             <View>
//                 <Button 
//                     title="식물 정보 더 보기"
//                     onPress={() => {setModalVisible(true)}}
//                     titleStyle={{ 
//                         fontWeight: 'bold',
//                         fontSize: 20,
//                         color: 'black',
//                     }}
//                     buttonStyle={{
//                         backgroundColor: 'white',
//                         borderColor: 'transparent',
//                         borderRadius: 30,
//                     }}
//                     containerStyle={{
//                         width: 170,
//                         marginHorizontal: 50,
//                         marginTop: 25,
//                     }}
//                 />
//             </View>
//             <Modal
//                     animationType="slide"
//                     presentationStyle={"formSheet"}
//                     transparent={false}
//                     visible={plantInfo == false ? modalVisible2 : modalVisible}
//                     onRequestClose={() => {setModalVisible(!modalVisible)}}> 
//                     <View>
//                         {ModalInfo}
//                     </View>
//             </Modal>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1, // 비율
//       backgroundColor: '#EDEFE3',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     plantName: {
//         fontSize: 40,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         marginTop: -25,
//     },
//     plantStatus: {
//         fontSize: 28,
//         fontWeight: 500,
//         marginBottom: 30,
//     },
//     container1: {
//         width: 230, 
//         height: 210, 
//         marginBottom: 35, 
//         marginTop: -20,
//         backgroundColor: '#CCCCCC',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     question: {
//         fontSize: 100,
//         fontWeight: 'bold',
//         color: '#000000',
//     },
//     progress: {
//         height: 100,
//         width: 140,
//     },
//     textContainer: {
//         position: 'absolute',
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
//       temperatureText: {
//         fontSize: 14,
//         color: '#000',
//       },
//       temperatureValue: {
//         fontSize: 24,
//         color: '#000',
//         marginLeft: 5,
//         fontWeight: 'bold'
//       },
//       progressContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginVertical: 20,
//       },
//       infoContainer: {
//         justifyContent: 'center',
//       },
//       infoText1: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#000',
//         marginBottom: 5,
//       },
//       infoText1Blue: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 5,
//         color: '#1E90FF',
//       },
//       infoText1Red: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#FF0000',
//         marginBottom: 5,
//       },
//       infoText2: {
//         fontSize: 18,
//         color: 'gray',
//       },
// });