import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'

export default function PlantSearch(){

    const [timeAlign, setTimeAlign] = useState(true)

    const renderItem = ({ item }) => (
        <Item title={item.title} description={item.description} image={item.image} state={item.state} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={timeAlign == true ? styles.textOn : styles.textOff} onPress={()=>setTimeAlign(true)}>이름 오름차순</Text>
                <Text>{"    "}</Text>
                <Text style={timeAlign == true ? styles.textOff : styles.textOn} onPress={()=>setTimeAlign(false)}>이름 내림차순</Text>
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={styles.container4}>
                <Text style={{fontSize: 30}}>여기에 페이징 버튼</Text>
            </View>
        </View>
    )
}

const data = [
    {
      id: '1',
      title: '대만 고무 나무',
      description: '대만고무나무의 밑둥을 분재처럼 둥글게 재배한 종류를 ‘인삼벤자민’,‘가쥬마루’라 부른다. 환경에 빨리 적응하지 못하므로 갑자기 햇빛으로 내놓거나, 실내로 옮기면 잎이 많이 떨어지므로 서서히 적응기간을 두어 옮긴다.',
      state: '온도: 10 ℃, 습도: 50%, 광: 1000 LUX',
      image: "https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg",
    },
    {
      id: '2',
      title: '스킨 답서스',
      description: '에코플렌트 중에서 가장 관리가 쉽고 잘 자라는 식물로 병해충에 대한 강한 저항성을 갖고 있다. 실내관엽 식물중 일산화탄소 제거능이 우수하여 주방의 기능성 식물로 알려진 종으로 어두운 곳에서도 잘 적응한다. 약 40m 길이까지 자랄 수 있는 덩굴성으로 행잉으로 이용하며 기근을 갖는다.',
      state: '온도: 10 ℃, 습도: 50%, 광: 1000 LUX',
      image: "https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg",
    },
    {
      id: '3',
      title: '세 번째 식물',
      description: '세 번째 식물 설명~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      state: '온도: 10 ℃, 습도: 50%, 광: 1000 LUX',
      image: "https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg",
    },
];

const Item = ({ title, description, image, state }) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.state}>{state}</Text>
      </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EDEFE3',
      paddingHorizontal: 35,
      justifyContent: 'center'
    },
    container2: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
        marginBottom: 10,
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
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderColor: '#939393',
    },
    image: {
      width: 60,
      height: 60,
      marginRight: 20,
      borderRadius: 10,
      borderColor: '#BDDC1C', 
      borderWidth: 3,
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
    }
});