import React, { useState, useEffect }  from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { useRoute } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";
import { FIREBASE_DB } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function PlantLive(){

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [plantName, setPlantName] = useState("")

  const route = useRoute();

  useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
    }, 1000);
    getData(route.params.uid);
    return () => {clearInterval(intervalId)};
  },[]);

  // 사용자 정보 가져오기
  const getData = async (uid) => { // 데이터 읽기
    console.log(uid)
    const docRef = doc(FIREBASE_DB, "Users", uid)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data().plantName)
      setPlantName(docSnap.data().plantName)
    }
  }

  const year = currentDateTime.getFullYear();
  const month = currentDateTime.getMonth() + 1;
  const day = currentDateTime.getDate();
  const hour = currentDateTime.getHours();
  const minute = currentDateTime.getMinutes();
  const second = currentDateTime.getSeconds();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎥 실시간 LIVE</Text>
      <YoutubePlayer
        height={300}
        play={true}
        width={350}
        quality="2160p"
        videoId={"8xHUdfaNtbw"}
      />
      <Text style={styles.name}>{plantName ? "🌱 " + plantName + " 🌱" : "식물 정보가 없습니다."}</Text>
      <Text style={styles.time}>{`${year}년 ${month}월 ${day}일`}</Text>
      <Text style={styles.time2}>{`${hour}시 ${minute}분 ${second}초`}</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEFE3',
  },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: -10,
    },
    name: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: -70, 
        marginBottom: 20,
    },
    time: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    time2: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 35,
    }
});