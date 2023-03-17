import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'

export default function Developer(){

    const renderItem = ({ item }) => (
        <Item name={item.name} email={item.email} image={item.image} />
    );

    return (
        <View style={styles.container}>
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
      image: "https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg",
    },
    {
      id: '2',
      name: '201901762 이지현',
      email: '2455jh@inu.ac.kr',
      image: "https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg",
    },
    {
      id: '3',
      name: '201901773 최규진',
      email: 'ㅇㅇㅇ@inu.ac.kr',
      image: "https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg",
    },
];

const Item = ({ name, email, image }) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{uri: image}} />
      <View>
        <Text style={styles.title}>인천대학교</Text>
        <Text style={styles.title}>임베디드시스템공학과</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{email}</Text>
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
      paddingRight: 5,
    },
    image: {
      width: 85,
      height: 85,
      marginRight: 30,
      borderRadius: 50,
      borderColor: '#BDDC1C', 
      borderWidth: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    }
});