import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FIREBASE_DB } from '../firebaseConfig';
import * as Linking from 'expo-linking';
import { collection, getDocs, query } from 'firebase/firestore';

export default function PlantSearch() {

  const PAGE_SIZE = 6; // 한 페이지에 보여줄 항목의 개수
  const [plantList, setPlantList] = useState([]); // 전체 식물 목록
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [timeAlign, setTimeAlign] = useState(true)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlant();
  }, []);

  const getPlant = async () => {
    const usersCollectionRef = collection(FIREBASE_DB, 'Plants');
    const qry = await query(usersCollectionRef);
    const data = await getDocs(qry);
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
    }));

    const plantListinfo = newData.map((data) => ({
      id: data.plantNo,
      title: data.plantName,
      image: data.plantImg,
    }));

    plantListinfo.sort((a, b) => (a.title > b.title) ? 1 : -1)

    setPlantList(plantListinfo);
    setLoading(false);
  };

  const link = (id) => {
    Linking.openURL("https://www.nongsaro.go.kr/portal/ps/psz/psza/contentSub.ps?menuId=PS00376&cntntsNo="+id)
  }

  const renderItem = ({ item }) => (
    <View style={styles.item} key={item.id}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={()=>link(item.id)}>
          <Text style={{color:"#5690E8",fontSize: 15}}>자세히 알아보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // 페이징 버튼을 생성하는 함수
  const renderPagingButtons = () => {
    const totalPages = Math.ceil(plantList.length / PAGE_SIZE); // 전체 페이지 수
    const pages = Array.from(Array(totalPages).keys()); // 페이지 번호를 배열로 생성

    // 현재 페이지 번호를 중심으로, 5개의 버튼만 보여줌
    const start = Math.max(page - 3, 0);
    const end = Math.min(start + 5, totalPages);

    return (
      <View style={styles.paging}>
            <TouchableOpacity
              onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <Text style={styles.pagingButton}>{'◀'}</Text>
            </TouchableOpacity>
            {pages.slice(start, end).map((p) => (
              <TouchableOpacity
                key={p + 1}
                onPress={() => setPage(p + 1)}
                style={styles.pagingButton}
              >
                <Text style={{fontSize: 30, fontWeight: page === p + 1 ? 'bold' : '200', color: page === p + 1 ? 'green' : 'black' }}>{p + 1}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() =>
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={page === totalPages}
            >
              <Text style={styles.pagingButton}>{'▶'}</Text>
            </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
          <ActivityIndicator size="large" color="green" />
          <Text style={{fontSize: 20}}>다른 식물 정보 가져오는 중 . . .</Text>
        </View> :
        <>
          <View style={styles.container2}>
            <Text style={timeAlign == true ? styles.textOn : styles.textOff} onPress={()=>{setTimeAlign(true); setPlantList(plantList.sort((a, b) => (a.title > b.title) ? 1 : -1))}}>이름 순 ⬇</Text>
            <Text>{"    "}</Text>
            <Text style={timeAlign == true ? styles.textOff : styles.textOn} onPress={()=>{setTimeAlign(false); setPlantList(plantList.sort((a, b) => (a.title > b.title) ? -1 : 1))}}>이름 순 ⬆</Text>
          </View>
          <View>
            <FlatList
              data={plantList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)} // 현재 페이지의 데이터만 보여줌
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          {renderPagingButtons()}
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EDEFE3',
      paddingHorizontal: 27,
      justifyContent: 'center'
    },
    container2: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
        marginBottom: 8,
        marginTop: -20,
    },
    container4: {
        marginTop: 20,
        //marginBottom: 20,
        //alignItems: 'center',
        flexDirection: 'row', 
        justifyContent: 'space-around'
    },
    textOn: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textOff: {
        fontSize: 20,
        color: 'gray',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: '#939393',
    },
    image: {
      width: 65,
      height: 65,
      marginRight: 13,
      borderRadius: 10,
      borderColor: '#BDDC1C', 
      borderWidth: 2,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    description: {
      fontSize: 14,
      color: 'black',
    },
    state: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    paging: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },
    pagingButton: {
      marginHorizontal: 10,
      fontSize: 30,
    },
});