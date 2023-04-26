// import { React, useState, useEffect } from 'react'
// import { useRoute } from '@react-navigation/native';
// import { Button } from '@rneui/base';
// import { View, Text, StyleSheet, Modal } from 'react-native';
// import { ProgressCircle } from 'react-native-svg-charts';
// import { FIREBASE_DB } from '../firebaseConfig';
// import { doc, getDoc,  onSnapshot } from 'firebase/firestore';
// import { PlantInfoModal } from '../components/PlantInfoModal'
// import { PlantAddModal } from '../components/PlantAddModal'

// export default function PlantInfo() {

//     const route = useRoute();

//     const [plantInfo, setPlantInfo] = useState(false);
//     const [plantName, setPlantName] = useState('');

//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalVisible2, setModalVisible2] = useState(false);

//     // 데이터베이스 읽기
//     useEffect(() => {
//         getData(route.params.uid)
//     }, []);

//     // 사용자 정보 가져오기
//     const getData = async (uid) => { // 데이터 읽기
//         const docRef = doc(FIREBASE_DB, "Users", uid)
//         const docSnap = await getDoc(docRef);
//     }
    
//     // 모달
//     const ModalInfo = (
//         <View>
//             <Button
//                 title="닫기"
//                 onPress={() => {setModalVisible2(!modalVisible2)}}
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
//             <PlantAddModal 
//                 modalVisible2={modalVisible2} setModalVisible2={setModalVisible2} 
//                 setPlantInfo={setPlantInfo} userUid={route.params.uid} setPlantName={setPlantName} 
//             /> 
//         </View> 
//     )

//     // 메인
//     return (
//         <View style={styles.container}>
//             <View>
//                 <Text style={styles.plantName}>
//                     🪴 식물 정보가 없습니다. 🪴
//                 </Text>
//             </View>
//             <View>
//                 <Button 
//                     title="식물 정보 등록하기"
//                     onPress={() => {setModalVisible2(true)}}
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
//                     onRequestClose={() => {plantInfo == false ? setModalVisible2(!modalVisible2) : setModalVisible(!modalVisible)}}> 
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
// });