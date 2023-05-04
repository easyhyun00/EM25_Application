import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'

export default function Developer(){

    const renderItem = ({ item }) => (
        <Item name={item.name} email={item.email} image={item.image} />
    );

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>EM25</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const data = [
    {
      id: '1',
      name: '201901756 오소민',
      email: 'ㅇㅇㅇ@inu.ac.kr',
      image: "https://firebasestorage.googleapis.com/v0/b/em25-c1a70.appspot.com/o/image%2F%EC%82%AC%EB%9E%8C1.png?alt=media&token=b7d30947-5904-4c94-a4a1-994600b547f6",
    },
    {
      id: '2',
      name: '201901762 이지현',
      email: '2455jh@inu.ac.kr',
      image: "https://firebasestorage.googleapis.com/v0/b/em25-c1a70.appspot.com/o/image%2F%EC%82%AC%EB%9E%8C2.png?alt=media&token=2e5c85e0-b3f9-46da-8c59-9c1e957313e5",
    },
    {
      id: '3',
      name: '201901773 최규진',
      email: 'ㅇㅇㅇ@inu.ac.kr',
      image: "https://firebasestorage.googleapis.com/v0/b/em25-c1a70.appspot.com/o/image%2F%EC%82%AC%EB%9E%8C3.png?alt=media&token=5d4c1de5-655b-4334-83a2-f57438c94d7e",
    },
];

const Item = ({ name, email, image,no }) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{uri: image}} />
      <View>
        <Text style={styles.title}>임베디드시스템공학과</Text>
        <Text style={styles.title}>👩‍💻{name}</Text>
        <Text style={{color: 'gray', fontSize: 16}}>✉️ {email}</Text>
      </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
      flex: 1, // 비율
      backgroundColor: '#EDEFE3',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 100,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 30,
      paddingRight: 15,
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 30,
      borderRadius: 50,
      borderWidth: 2,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    }
});