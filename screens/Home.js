import { Button } from '@rneui/base';
import { React, useEffect, useState }from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {

  const [userId, setUserId] = useState('')
  const [plantRegister, setPlantRegister] = useState(true)

  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if(user) {
        console.log("user",user)
        setUserId(user.uid)
        // getData(user.uid)
      } else {
        navigation.navigate("Login");
      }
    })
},[]);

// // 사용자 정보 가져오기
// const getData = async (uid) => { // 데이터 읽기
//   const docRef = doc(FIREBASE_DB, "Users", uid)
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//       if (docSnap.data().plantRegistration) {
//         setPlantRegister(true)
//       } else {
//         setPlantRegister(false)
//       }
//   }
// }

console.log("plantRegister",plantRegister)

const renderItem=(item, index) => {

  const navigation = useNavigation();
  return(
    <Button 
          key={index}
          onPress={()=>navigation.navigate(item.title,{uid : userId})}
          title={
          <View style={{ flexDirection: 'column', flex: 1  }}>
            <Text style={{ fontWeight: 'bold', fontSize: 21 }}>{item.title}</Text>
            <Text style={{ fontStyle: 'italic', fontSize: 14, marginTop: 5 }}>
              {item.subTitle}
            </Text>
          </View>
          }
          type="clear"
          icon={item.icon}
          titleStyle={{ 
            fontWeight: 'bold',
            fontSize: 20,
            color: 'gray',
          }}
          buttonStyle={{
            borderColor: 'transparent',
            borderWidth: 15,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 340,
            marginHorizontal: 50,
            marginRight: 20,
            justifyContent: 'center',
          }}
      />
  )
}

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>식물 관리 서비스 🪴</Text>
      {<CustomInfo />}
      {data.map(renderItem)}
    </View>
  );
};

const CustomInfo = () => {
  return (
    <Button 
        title={
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 21 }}>나의 실내 정원을 관리하세요 !</Text>
          <Text style={{ fontStyle: 'italic', fontSize: 14, marginTop: 5 }}>
            식물 정보를 한 눈에 !
          </Text>
        </View>
        }
        icon={{
          name: 'home',
          type: 'font-awesome',
          size: 30,
        }}
        iconContainerStyle={{ marginRight: 15 }}
        titleStyle={{ 
          fontWeight: 'bold',
          fontSize: 20,
          color: 'gray',
        }}
        buttonStyle={{
          backgroundColor: '#DBEA8D',
          borderColor: 'transparent',
          borderWidth: 15,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 340,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
  );
};

const data = [
  {key:"1",title:"식물 정보 보기",subTitle:"나의 식물을 키우기 위한 정보를 알아봐요.",icon:(<MaterialIcons name="grass" size={30} color="black" style={{marginRight: 15, marginLeft: 5}} />)},
  {key:"2",title:"식물 실시간 보기",subTitle:"현재 나의 식물 상태를 실시간으로 봐요.",icon:(<Feather name="camera" size={30} color="black" style={{marginRight: 15, marginLeft: 5}} />)},
  {key:"3",title:"식물 타임라인 보기",subTitle:"일주일 전과 달라진 나의 식물을 봐요.",icon:(<AntDesign name="picture" size={30} color="black" style={{marginRight: 15, marginLeft: 5}} />)},
  {key:"4",title:"다른 식물 알아 보기",subTitle:"내 식물말고 다른 식물을 알아봐요.",icon:(<AntDesign name="search1" size={30} color="black" style={{marginRight: 15, marginLeft: 5}} />)},
  {key:"5",title:"팀원 정보 보기",subTitle:"임베디드 시스템 공학과 EM25를 더 알아봐요.",icon:(<AntDesign name="infocirlceo" size={30} color="black" style={{marginRight: 15, marginLeft: 5}} />)},
  //{key:"6",title:"OpenApi",subTitle:"api저장",icon:(<AntDesign name="infocirlceo" size={30} color="black" style={{marginRight: 15, marginLeft: 5}} />)},
]

const styles = StyleSheet.create({
  container: {
    flex: 1, // 비율
    backgroundColor: '#EDEFE3',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  textStyle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'green',
    margin: 10,
    marginTop: 50,
  },
  buttonStyle: {
    borderRadius: 30,
    backgroundColor: 'white',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    //justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  titleContainer: {
    marginLeft: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 2,
  },
});